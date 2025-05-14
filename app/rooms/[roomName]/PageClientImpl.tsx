'use client';

import { decodePassphrase } from '@/lib/client-utils';
import { DebugMode } from '@/lib/Debug';
import { RecordingIndicator } from '@/lib/RecordingIndicator';
import { SettingsMenu } from '@/lib/SettingsMenu';
import { ConnectionDetails } from '@/lib/types';
import {
  formatChatMessageLinks,
  LocalUserChoices,
  ControlBar,
  // VideoConference,
  useTracks,
  useLocalParticipant,
} from '@/app/liveKit/components-react';
import { useSession } from 'next-auth/react';

import { RoomContext } from '../../liveKit/components-react/src/context/room-context';

import {
  PreJoin,
} from '../../liveKit/components-react/src/prefabs/PreJoin';
import {
  VideoConference,
} from '../../liveKit/components-react/src/prefabs/VideoConference';
import {
  ExternalE2EEKeyProvider,
  RoomOptions,
  VideoCodec,
  VideoPresets,
  Room,
  DeviceUnsupportedError,
  RoomConnectOptions,
  RoomEvent,
} from 'livekit-client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from './Meeting.module.css';
import PrejoinHeader from '@/app/components/PrejoinHeader';

const CONN_DETAILS_ENDPOINT =
  process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? '/api/connection-details';
const SHOW_SETTINGS_MENU = process.env.NEXT_PUBLIC_SHOW_SETTINGS_MENU == 'true';

export function PageClientImpl(props: {
  roomName: string;
  region?: string;
  hq: boolean;
  codec: VideoCodec;
}) {
  const { data: session } = useSession();
  const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(
    undefined,
  );
  const preJoinDefaults = React.useMemo(() => {
    return {
      username: session?.user?.name || '',
      videoEnabled: true,
      audioEnabled: true,
    };
  }, [session]);
  const [connectionDetails, setConnectionDetails] = React.useState<ConnectionDetails | undefined>(
    undefined,
  );

  const handlePreJoinSubmit = React.useCallback(async (values: LocalUserChoices) => {
    try {
      setPreJoinChoices(values);
      const url = new URL(CONN_DETAILS_ENDPOINT, window.location.origin);
      url.searchParams.append('roomName', props.roomName);
      url.searchParams.append('participantName', values.username);
      if (props.region) {
        url.searchParams.append('region', props.region);
      }
      const connectionDetailsResp = await fetch(url.toString());
      
      if (!connectionDetailsResp.ok) {
        throw new Error(`Failed to get connection details: ${connectionDetailsResp.statusText}`);
      }

      const contentType = connectionDetailsResp.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format: Expected JSON');
      }

      const connectionDetailsData = await connectionDetailsResp.json();
      
      if (!connectionDetailsData || 
          typeof connectionDetailsData.serverUrl !== 'string' ||
          typeof connectionDetailsData.roomName !== 'string' ||
          typeof connectionDetailsData.participantToken !== 'string' ||
          typeof connectionDetailsData.participantName !== 'string') {
        throw new Error('Invalid connection details format');
      }

      setConnectionDetails(connectionDetailsData);
    } catch (error) {
      console.error('Error getting connection details:', error);
      alert(`Failed to get connection details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [props.roomName, props.region]);

  const handlePreJoinError = React.useCallback((e: any) => console.error(e), []);

  return (
    <main style={{backgroundColor: '#FFF'}}>
      {connectionDetails === undefined || preJoinChoices === undefined ? (
        <div>
          <PrejoinHeader /> 
          <PreJoin
            defaults={preJoinDefaults}
            onSubmit={handlePreJoinSubmit}
            onError={handlePreJoinError}
          />
        </div>
      ) : (
        <VideoConferenceComponent
          connectionDetails={connectionDetails}
          userChoices={preJoinChoices}
          options={{ codec: props.codec, hq: props.hq }}
        />
      )}
    </main>
  );
}

function VideoConferenceContent() {
  const tracks = useTracks();
  const { localParticipant } = useLocalParticipant();
  const room = React.useContext(RoomContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div style={{ width: '500px', height: '400px'}}>
    <VideoConference
      chatMessageFormatter={formatChatMessageLinks}
      SettingsComponent={SHOW_SETTINGS_MENU ? SettingsMenu : undefined}
    >
      <div className={`${styles.meetingContainer} ${isFullscreen ? styles.fullscreen : ''}`}>
        <div className={styles.mainContent}>
          <div className={styles.videoGrid}>
            {/* Video tiles will be rendered here by VideoConference */}
          </div>
          
          <div className={styles.sidebar}>
            {showParticipants && (
              <div className={styles.participantsPanel}>
                <h3>Participants</h3>
                <div className={styles.participantsList}>
                  {room?.numParticipants} participants
                </div>
              </div>
            )}
            
            {showChat && (
              <div className={styles.chatPanel}>
                <h3>Chat</h3>
                {/* Chat component will be added here */}
              </div>
            )}
          </div>
        </div>

        <div className={styles.controlBar}>
          <ControlBar
            controls={{
              camera: true,
              microphone: true,
              screenShare: true,
              leave: true,
              chat: true,
            }}
          />
        </div>
      </div>
    </VideoConference>
    </div>
  );
}

function VideoConferenceComponent(props: {
  userChoices: LocalUserChoices;
  connectionDetails: ConnectionDetails;
  options: {
    hq: boolean;
    codec: VideoCodec;
  };
}) {
  const e2eePassphrase =
    typeof window !== 'undefined' && decodePassphrase(location.hash.substring(1));

  const worker =
    typeof window !== 'undefined' &&
    e2eePassphrase &&
    new Worker(new URL('livekit-client/e2ee-worker', import.meta.url));
  const e2eeEnabled = !!(e2eePassphrase && worker);
  const keyProvider = new ExternalE2EEKeyProvider();
  const [e2eeSetupComplete, setE2eeSetupComplete] = React.useState(false);

  const roomOptions = React.useMemo((): RoomOptions => {
    let videoCodec: VideoCodec | undefined = props.options.codec ? props.options.codec : 'vp9';
    if (e2eeEnabled && (videoCodec === 'av1' || videoCodec === 'vp9')) {
      videoCodec = undefined;
    }
    return {
      videoCaptureDefaults: {
        deviceId: props.userChoices.videoDeviceId ?? undefined,
        resolution: props.options.hq ? VideoPresets.h2160 : VideoPresets.h720,
      },
      publishDefaults: {
        dtx: false,
        videoSimulcastLayers: props.options.hq
          ? [VideoPresets.h1080, VideoPresets.h720]
          : [VideoPresets.h540, VideoPresets.h216],
        red: !e2eeEnabled,
        videoCodec,
      },
      audioCaptureDefaults: {
        deviceId: props.userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
      e2ee: e2eeEnabled
        ? {
            keyProvider,
            worker,
          }
        : undefined,
    };
  }, [props.userChoices, props.options.hq, props.options.codec]);

  const room = React.useMemo(() => new Room(roomOptions), []);

  React.useEffect(() => {
    if (e2eeEnabled) {
      keyProvider
        .setKey(decodePassphrase(e2eePassphrase))
        .then(() => {
          room.setE2EEEnabled(true).catch((e) => {
            if (e instanceof DeviceUnsupportedError) {
              alert(
                `You're trying to join an encrypted meeting, but your browser does not support it. Please update it to the latest version and try again.`,
              );
              console.error(e);
            } else {
              throw e;
            }
          });
        })
        .then(() => setE2eeSetupComplete(true));
    } else {
      setE2eeSetupComplete(true);
    }
  }, [e2eeEnabled, room, e2eePassphrase]);

  const connectOptions = React.useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);

  React.useEffect(() => {
    room.on(RoomEvent.Disconnected, handleOnLeave);
    room.on(RoomEvent.EncryptionError, handleEncryptionError);
    room.on(RoomEvent.MediaDevicesError, handleError);
    if (e2eeSetupComplete) {
      room
        .connect(
          props.connectionDetails.serverUrl,
          props.connectionDetails.participantToken,
          connectOptions,
        )
        .catch((error) => {
          handleError(error);
        });
      if (props.userChoices.videoEnabled) {
        room.localParticipant.setCameraEnabled(true).catch((error) => {
          handleError(error);
        });
      }
      if (props.userChoices.audioEnabled) {
        room.localParticipant.setMicrophoneEnabled(true).catch((error) => {
          handleError(error);
        });
      }
    }
    return () => {
      room.off(RoomEvent.Disconnected, handleOnLeave);
      room.off(RoomEvent.EncryptionError, handleEncryptionError);
      room.off(RoomEvent.MediaDevicesError, handleError);
    };
  }, [e2eeSetupComplete, room, props.connectionDetails, props.userChoices]);

  const router = useRouter();
  const handleOnLeave = React.useCallback(() => router.push('/'), [router]);
  const handleError = React.useCallback((error: Error) => {
    console.error(error);
    alert(`Encountered an unexpected error, check the console logs for details: ${error.message}`);
  }, []);
  const handleEncryptionError = React.useCallback((error: Error) => {
    console.error(error);
    alert(
      `Encountered an unexpected encryption error, check the console logs for details: ${error.message}`,
    );
  }, []);

  return (
    <RoomContext.Provider value={room}>
      <div className="lk-room-container">
        <VideoConference
          chatMessageFormatter={formatChatMessageLinks}
          SettingsComponent={SHOW_SETTINGS_MENU ? SettingsMenu : undefined}
        />
        <DebugMode />
        <RecordingIndicator />
      </div>
    </RoomContext.Provider>
  );
}
