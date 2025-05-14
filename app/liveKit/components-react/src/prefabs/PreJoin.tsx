import './PreJoin.css';
import type {
  CreateLocalTracksOptions,
  LocalAudioTrack,
  LocalTrack,
  LocalVideoTrack,
  TrackProcessor,
} from 'livekit-client';
import {
  createLocalAudioTrack,
  createLocalTracks,
  createLocalVideoTrack,
  facingModeFromLocalTrack,
  Track,
  VideoPresets,
  Mutex,
} from 'livekit-client';
import * as React from 'react';
import { MediaDeviceMenu } from './MediaDeviceMenu';
import { TrackToggle } from '../components/controls/TrackToggle';
import type { LocalUserChoices } from '@livekit/components-core';
import { log } from '@livekit/components-core';
import { ParticipantPlaceholder } from '../assets/images';
import { useMediaDevices, usePersistentUserChoices } from '../hooks';
import { useWarnAboutMissingStyles } from '../hooks/useWarnAboutMissingStyles';
import { roomOptionsStringifyReplacer } from '../utils';

/**
 * Props for the PreJoin component.
 * @public
 */
export interface PreJoinProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onError'> {
  /** This function is called with the `LocalUserChoices` if validation is passed. */
  onSubmit?: (values: LocalUserChoices) => void;
  /**
   * Provide your custom validation function. Only if validation is successful the user choices are past to the onSubmit callback.
   */
  onValidate?: (values: LocalUserChoices) => boolean;
  onError?: (error: Error) => void;
  /** Prefill the input form with initial values. */
  defaults?: Partial<LocalUserChoices>;
  /** Display a debug window for your convenience. */
  debug?: boolean;
  joinLabel?: string;
  micLabel?: string;
  camLabel?: string;
  userLabel?: string;
  /**
   * If true, user choices are persisted across sessions.
   * @defaultValue true
   * @alpha
   */
  persistUserChoices?: boolean;
  videoProcessor?: TrackProcessor<Track.Kind.Video>;
}

/** @public */
export function usePreviewTracks(
  options: CreateLocalTracksOptions,
  onError?: (err: Error) => void,
) {
  const [tracks, setTracks] = React.useState<LocalTrack[]>();

  const trackLock = React.useMemo(() => new Mutex(), []);

  React.useEffect(() => {
    let needsCleanup = false;
    let localTracks: Array<LocalTrack> = [];
    trackLock.lock().then(async (unlock) => {
      try {
        if (options.audio || options.video) {
          localTracks = await createLocalTracks(options);

          if (needsCleanup) {
            localTracks.forEach((tr) => tr.stop());
          } else {
            setTracks(localTracks);
          }
        }
      } catch (e: unknown) {
        if (onError && e instanceof Error) {
          onError(e);
        } else {
          log.error(e);
        }
      } finally {
        unlock();
      }
    });

    return () => {
      needsCleanup = true;
      localTracks.forEach((track) => {
        track.stop();
      });
    };
  }, [JSON.stringify(options, roomOptionsStringifyReplacer), onError, trackLock]);

  return tracks;
}

/**
 * @public
 * @deprecated use `usePreviewTracks` instead
 */
export function usePreviewDevice<T extends LocalVideoTrack | LocalAudioTrack>(
  enabled: boolean,
  deviceId: string,
  kind: 'videoinput' | 'audioinput',
) {
  const [deviceError, setDeviceError] = React.useState<Error | null>(null);
  const [isCreatingTrack, setIsCreatingTrack] = React.useState<boolean>(false);

  const devices = useMediaDevices({ kind });
  const [selectedDevice, setSelectedDevice] = React.useState<MediaDeviceInfo | undefined>(
    undefined,
  );

  const [localTrack, setLocalTrack] = React.useState<T>();
  const [localDeviceId, setLocalDeviceId] = React.useState<string>(deviceId);

  React.useEffect(() => {
    setLocalDeviceId(deviceId);
  }, [deviceId]);

  const createTrack = async (deviceId: string, kind: 'videoinput' | 'audioinput') => {
    try {
      const track =
        kind === 'videoinput'
          ? await createLocalVideoTrack({
              deviceId,
              resolution: VideoPresets.h720.resolution,
            })
          : await createLocalAudioTrack({ deviceId });

      const newDeviceId = await track.getDeviceId(false);
      if (newDeviceId && deviceId !== newDeviceId) {
        prevDeviceId.current = newDeviceId;
        setLocalDeviceId(newDeviceId);
      }
      setLocalTrack(track as T);
    } catch (e) {
      if (e instanceof Error) {
        setDeviceError(e);
      }
    }
  };

  const switchDevice = async (track: LocalVideoTrack | LocalAudioTrack, id: string) => {
    await track.setDeviceId(id);
    prevDeviceId.current = id;
  };

  const prevDeviceId = React.useRef(localDeviceId);

  React.useEffect(() => {
    if (enabled && !localTrack && !deviceError && !isCreatingTrack) {
      log.debug('creating track', kind);
      setIsCreatingTrack(true);
      createTrack(localDeviceId, kind).finally(() => {
        setIsCreatingTrack(false);
      });
    }
  }, [enabled, localTrack, deviceError, isCreatingTrack]);

  // switch camera device
  React.useEffect(() => {
    if (!localTrack) {
      return;
    }
    if (!enabled) {
      log.debug(`muting ${kind} track`);
      localTrack.mute().then(() => log.debug(localTrack.mediaStreamTrack));
    } else if (selectedDevice?.deviceId && prevDeviceId.current !== selectedDevice?.deviceId) {
      log.debug(`switching ${kind} device from`, prevDeviceId.current, selectedDevice.deviceId);
      switchDevice(localTrack, selectedDevice.deviceId);
    } else {
      log.debug(`unmuting local ${kind} track`);
      localTrack.unmute();
    }
  }, [localTrack, selectedDevice, enabled, kind]);

  React.useEffect(() => {
    return () => {
      if (localTrack) {
        log.debug(`stopping local ${kind} track`);
        localTrack.stop();
        localTrack.mute();
      }
    };
  }, []);

  React.useEffect(() => {
    setSelectedDevice(devices?.find((dev) => dev.deviceId === localDeviceId));
  }, [localDeviceId, devices]);

  return {
    selectedDevice,
    localTrack,
    deviceError,
  };
}

/**
 * The `PreJoin` prefab component is normally presented to the user before he enters a room.
 * This component allows the user to check and select the preferred media device (camera und microphone).
 * On submit the user decisions are returned, which can then be passed on to the `LiveKitRoom` so that the user enters the room with the correct media devices.
 *
 * @remarks
 * This component is independent of the `LiveKitRoom` component and should not be nested within it.
 * Because it only accesses the local media tracks this component is self-contained and works without connection to the LiveKit server.
 *
 * @example
 * ```tsx
 * <PreJoin />
 * ```
 * @public
 */
export function PreJoin({
  defaults = {},
  onValidate,
  onSubmit,
  onError,
  debug,
  joinLabel = 'Join Room',
  micLabel = 'Microphone',
  camLabel = 'Camera',
  userLabel = 'Username',
  persistUserChoices = true,
  videoProcessor,
  ...htmlProps
}: PreJoinProps) {
  const {
    userChoices: initialUserChoices,
    saveAudioInputDeviceId,
    saveAudioInputEnabled,
    saveVideoInputDeviceId,
    saveVideoInputEnabled,
    saveUsername,
  } = usePersistentUserChoices({
    defaults,
    preventSave: !persistUserChoices,
    preventLoad: !persistUserChoices,
  });

  const [userChoices, setUserChoices] = React.useState(initialUserChoices);

  // Initialize device settings
  const [audioEnabled, setAudioEnabled] = React.useState<boolean>(userChoices.audioEnabled);
  const [videoEnabled, setVideoEnabled] = React.useState<boolean>(userChoices.videoEnabled);
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>(userChoices.audioDeviceId);
  const [videoDeviceId, setVideoDeviceId] = React.useState<string>(userChoices.videoDeviceId);
  const [username, setUsername] = React.useState(userChoices.username || '');

  // Fetch and persist username from session
  React.useEffect(() => {
    const fetchAndPersistUsername = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          const sessionUsername = data.user?.name || 'Anonymous User';
          setUsername(sessionUsername);
          // Persist the username
          saveUsername(sessionUsername);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
        const fallbackUsername = 'Anonymous User';
        setUsername(fallbackUsername);
        saveUsername(fallbackUsername);
      }
    };

    fetchAndPersistUsername();
  }, [saveUsername]);

  // Save user choices to persistent storage.
  React.useEffect(() => {
    saveAudioInputEnabled(audioEnabled);
  }, [audioEnabled, saveAudioInputEnabled]);
  React.useEffect(() => {
    saveVideoInputEnabled(videoEnabled);
  }, [videoEnabled, saveVideoInputEnabled]);
  React.useEffect(() => {
    saveAudioInputDeviceId(audioDeviceId);
  }, [audioDeviceId, saveAudioInputDeviceId]);
  React.useEffect(() => {
    saveVideoInputDeviceId(videoDeviceId);
  }, [videoDeviceId, saveVideoInputDeviceId]);

  const tracks = usePreviewTracks(
    {
      audio: audioEnabled ? { deviceId: initialUserChoices.audioDeviceId } : false,
      video: videoEnabled
        ? { deviceId: initialUserChoices.videoDeviceId, processor: videoProcessor }
        : false,
    },
    onError,
  );

  const videoEl = React.useRef(null);

  const videoTrack = React.useMemo(
    () => tracks?.filter((track) => track.kind === Track.Kind.Video)[0] as LocalVideoTrack,
    [tracks],
  );

  const facingMode = React.useMemo(() => {
    if (videoTrack) {
      const { facingMode } = facingModeFromLocalTrack(videoTrack);
      return facingMode;
    } else {
      return 'undefined';
    }
  }, [videoTrack]);

  const audioTrack = React.useMemo(
    () => tracks?.filter((track) => track.kind === Track.Kind.Audio)[0] as LocalAudioTrack,
    [tracks],
  );

  React.useEffect(() => {
    if (videoEl.current && videoTrack) {
      videoTrack.unmute();
      videoTrack.attach(videoEl.current);
    }

    return () => {
      videoTrack?.detach();
    };
  }, [videoTrack]);

  const [isValid, setIsValid] = React.useState<boolean>();

  const handleValidation = React.useCallback(
    (values: LocalUserChoices) => {
      if (typeof onValidate === 'function') {
        return onValidate(values);
      } else {
        return values.username !== '';
      }
    },
    [onValidate],
  );

  React.useEffect(() => {
    const newUserChoices = {
      username: username || 'Anonyms',
      videoEnabled,
      videoDeviceId,
      audioEnabled,
      audioDeviceId,
    };
    setUserChoices(newUserChoices);
    setIsValid(handleValidation(newUserChoices));
  }, [username, videoEnabled, handleValidation, audioEnabled, audioDeviceId, videoDeviceId]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (handleValidation(userChoices)) {
      if (typeof onSubmit === 'function') {
        onSubmit(userChoices);
      }
    } else {
      log.warn('Validation failed with: ', userChoices);
    }
  }

  useWarnAboutMissingStyles();

  const renderMicIcon = () => {
    return (
      <div>
        <button
          className="lk-control-btn lk-mic-btn"
          style={{
            background: audioEnabled ? 'transparent' : 'red',
            border: audioEnabled ? '1px solid #FFF' : 'none',
          }}
          title={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
          onClick={() => setAudioEnabled((prev) => !prev)}
          type="button"
        >
          {audioEnabled ? (
            <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"
                fill="#fff"
                stroke="none"
              ></path>
              <path
                d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
                fill="#fff"
                stroke="none"
              ></path>
            </svg>
          ) : (
            <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M11 5c0-.55.45-1 1-1s1 .45 1 1v5.17l1.82 1.82c.11-.31.18-.64.18-.99V5c0-1.66-1.34-3-3-3S9 3.34 9 5v1.17l2 2V5zM2.81 2.81L1.39 4.22l11.65 11.65c-.33.08-.68.13-1.04.13-2.76 0-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c.57-.08 1.12-.24 1.64-.46l5.14 5.14 1.41-1.41L2.81 2.81zM19 11h-2c0 .91-.26 1.75-.69 2.48l1.46 1.46A6.921 6.921 0 0 0 19 11z"
                fill="#fff"
                stroke="none"
              ></path>
            </svg>
          )}
        </button>
      </div>
    );
  };

  const renderCameraIcon = () => {
    return (
      <div>
        <button
          className="lk-control-btn lk-cam-btn"
          style={{
            background: videoEnabled ? 'transparent' : 'red',
            border: videoEnabled ? '1px solid #FFF' : 'none',
          }}
          title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
          onClick={() => setVideoEnabled((prev) => !prev)}
          type="button"
        >
          {videoEnabled ? (
            <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zm-2-.79V18H4V6h12v3.69z"
                fill="#fff"
                stroke="none"
              ></path>
            </svg>
          ) : (
            <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M18 10.48V6c0-1.1-.9-2-2-2H6.83l2 2H16v7.17l2 2v-1.65l4 3.98v-11l-4 3.98zM16 16L6 6 4 4 2.81 2.81 1.39 4.22l.85.85C2.09 5.35 2 5.66 2 6v12c0 1.1.9 2 2 2h12c.34 0 .65-.09.93-.24l2.85 2.85 1.41-1.41L18 18l-2-2zM4 18V6.83L15.17 18H4z"
                fill="#fff"
                stroke="none"
              ></path>
            </svg>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="lk-prejoin-root">
      {/* Left: Video Preview Section */}
      <div className="lk-prejoin-left">
        <div className="lk-video-preview-container" style={{width: '800px', height: '480px'}}>
          {/* Top overlays */}
          <div className="lk-video-overlay-top">
            <input
              className="lk-user-name"
              id="username"
              name="username"
              type="text"
              value={username}
              autoComplete="off"
              style={{
                color: '#fff',
                fontSize: '14px',
                border: '1px solid rgba(255,255,255,0.3)',
                fontWeight: 500,
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px',
                padding: '0.3em 1em',
                minWidth: '100px',
                pointerEvents: 'auto',
                outline: 'none',
                transition: 'all 0.2s',
              }}
            />
            <span className="lk-video-quality">1080p</span>
          </div>
          {/* Video or Placeholder */}
          {videoTrack && videoEnabled ? (
            <video
              ref={videoEl}
              width="800"
              height="480"
              data-lk-facing-mode={facingMode}
              style={{borderRadius: '10px'}}
              className="lk-video-preview"
              autoPlay
              playsInline
              muted
            />
          ) : (
            <div className="lk-camera-off-note lk-video-preview">
              <span style={{color: '#FFF', fontSize: '22px'}}>Camera is off</span>
            </div>
          )}
          {/* Bottom controls */}
          <div className="lk-video-controls" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingLeft: '20px', paddingRight: '20px'}}>
            <div className="lk-control-btn lk-bg-btn" style={{border: '0px solid #FFF'}}/>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            {renderMicIcon()}
            {renderCameraIcon()}
            </div>
            <button className="lk-control-btn lk-bg-btn" title="Background options">
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdXsJNUt1TOQIZR9BI4OfBX16gDsH4oTcTLA&s" style={{width: '24px', height: '24px'}}/>
          </button>
          </div>
        </div>
        {/* Device selection dropdowns */}
        {/* <div className="lk-device-selection-row" style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', marginTop: '-10px', width: '100%'}}>
          <MediaDeviceMenu 
            style={{width: '60px', height: '30px', backgroundColor: 'rgba(0,0,0,0.1)', border: '0px solid #FFF'}}
            initialSelection={audioDeviceId}
            kind="audioinput"
            disabled={!audioTrack}
            tracks={{ audioinput: audioTrack }}
            onActiveDeviceChange={(_, id) => setAudioDeviceId(id)}
          />
          <MediaDeviceMenu
            style={{width: '60px', height: '30px', backgroundColor: 'rgba(0,0,0,0.1)', border: '0px solid #FFF'}}
            initialSelection={videoDeviceId}
            kind="videoinput"
            disabled={!videoTrack}
            tracks={{ videoinput: videoTrack }}
            onActiveDeviceChange={(_, id) => setVideoDeviceId(id)}
          />
        </div> */}
      </div>
      {/* Right: Join Section */}
      <div className="lk-prejoin-right">
        <form className="lk-join-form">
          <div className="lk-room-info">
            <div className="lk-room-name">
              {typeof window === 'undefined' ? 'Sample Meeting' : (username ? `Meeting with ${username}` : 'Sample Meeting')}
            </div>
            <div className="lk-room-subtext">No one else is here</div>
          </div>
          <button className="lk-button lk-join-button" type="submit" onClick={handleSubmit}>
            Join now
          </button>
          <button className="lk-other-ways-btn" type="button" tabIndex={-1}>
            Other ways to join
          </button>
        </form>
      </div>
    </div>
  );
}
