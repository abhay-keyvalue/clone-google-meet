import './ControlBar.css';
import { Track } from 'livekit-client';
import * as React from 'react';
import { MediaDeviceMenu } from './MediaDeviceMenu';
import { DisconnectButton } from '../components/controls/DisconnectButton';
import { TrackToggle } from '../components/controls/TrackToggle';
import { ChatIcon, GearIcon, LeaveIcon, CaptionIcon, RaiseHandIcon, MoreOptionsIcon } from '../assets/icons';
import { ChatToggle } from '../components/controls/ChatToggle';
import { useLocalParticipantPermissions, usePersistentUserChoices } from '../hooks';
import { useMediaQuery } from '../hooks/internal';
import { useMaybeLayoutContext } from '../context';
import { supportsScreenSharing } from '@livekit/components-core';
import { mergeProps } from '../utils';
import { StartMediaButton } from '../components/controls/StartMediaButton';
import { SettingsMenuToggle } from '../components/controls/SettingsMenuToggle';
import { EmojiButton } from '../components/controls/EmojiButton';
import { CaptionButton } from '../components/controls/CaptionButton';
import { RaiseHandButton } from '../components/controls/RaiseHandButton';
import { MoreOptionsButton } from '../components/controls/MoreOptionsButton';
import { Chat } from './Chat';


/** @public */
export type ControlBarControls = {
  microphone?: boolean;
  camera?: boolean;
  chat?: boolean;
  screenShare?: boolean;
  leave?: boolean;
  settings?: boolean;
  caption?: boolean;
  raiseHand?: boolean;
  moreOptions?: boolean;
};

/** @public */
export interface ControlBarProps extends React.HTMLAttributes<HTMLDivElement> {
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void;
  variation?: 'minimal' | 'verbose' | 'textOnly';
  controls?: ControlBarControls;
  /**
   * If `true`, the user's device choices will be persisted.
   * This will enable the user to have the same device choices when they rejoin the room.
   * @defaultValue true
   * @alpha
   */
  saveUserChoices?: boolean;
}

/**
 * The `ControlBar` prefab gives the user the basic user interface to control their
 * media devices (camera, microphone and screen share), open the `Chat` and leave the room.
 *
 * @remarks
 * This component is build with other LiveKit components like `TrackToggle`,
 * `DeviceSelectorButton`, `DisconnectButton` and `StartAudio`.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <ControlBar />
 * </LiveKitRoom>
 * ```
 * @public
 */
export function ControlBar({
  variation,
  controls,
  saveUserChoices = true,
  onDeviceError,
  ...props
}: ControlBarProps) {
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState('');
  const [meetingCode, setMeetingCode] = React.useState('');
  const layoutContext = useMaybeLayoutContext();
  React.useEffect(() => {
    if (layoutContext?.widget.state?.showChat !== undefined) {
      setIsChatOpen(layoutContext?.widget.state?.showChat);
    }
  }, [layoutContext?.widget.state?.showChat]);
  const isTooLittleSpace = useMediaQuery(`(max-width: ${isChatOpen ? 1000 : 760}px)`);

  const defaultVariation = isTooLittleSpace ? 'minimal' : 'verbose';
  variation ??= defaultVariation;

  const visibleControls = { 
    leave: true, 
    emoji: true, 
    caption: true,
    raiseHand: true,
    moreOptions: true,
    ...controls 
  };

  const localPermissions = useLocalParticipantPermissions();

  if (!localPermissions) {
    visibleControls.camera = false;
    visibleControls.chat = false;
    visibleControls.microphone = false;
    visibleControls.screenShare = false;
  } else {
    visibleControls.camera ??= localPermissions.canPublish;
    visibleControls.microphone ??= localPermissions.canPublish;
    visibleControls.screenShare ??= localPermissions.canPublish;
    visibleControls.chat ??= localPermissions.canPublishData && controls?.chat;
  }

  const showIcon = React.useMemo(
    () => variation === 'minimal' || variation === 'verbose',
    [variation],
  );
  const showText = React.useMemo(
    () => variation === 'textOnly' || variation === 'verbose',
    [variation],
  );

  const browserSupportsScreenSharing = supportsScreenSharing();

  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);

  const onScreenShareChange = React.useCallback(
    (enabled: boolean) => {
      setIsScreenShareEnabled(enabled);
    },
    [setIsScreenShareEnabled],
  );

  const htmlProps = mergeProps({ className: 'lk-control-bar' }, props);

  const {
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId,
  } = usePersistentUserChoices({ preventSave: !saveUserChoices });

  const microphoneOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveAudioInputEnabled(enabled) : null,
    [saveAudioInputEnabled],
  );

  const cameraOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveVideoInputEnabled(enabled) : null,
    [saveVideoInputEnabled],
  );

  // Update time every minute
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Get meeting code from URL
  React.useEffect(() => {
    const code = window.location.pathname.split('/').pop() || '';
    setMeetingCode(code);
  }, []);

  return (
    <div className="lk-controlbar-root">
      <div className="lk-controlbar-info">
        <span className="lk-controlbar-time">{currentTime}</span>
        <span className="lk-controlbar-divider">|</span>
        <span className="lk-controlbar-code">{meetingCode}</span>
      </div>
      <div className="lk-controlbar-center">
        {visibleControls.microphone && (
          <div className="lk-controlbar-btn-group">
            <TrackToggle
              source={Track.Source.Microphone}
              showIcon={showIcon}
              onChange={microphoneOnChange}
              onDeviceError={(error) => onDeviceError?.({ source: Track.Source.Microphone, error })}
            />
          </div>
        )}
        {visibleControls.camera && (
          <div className="lk-controlbar-btn-group">
            <TrackToggle
              source={Track.Source.Camera}
              showIcon={showIcon}
              onChange={cameraOnChange}
              onDeviceError={(error) => onDeviceError?.({ source: Track.Source.Camera, error })}
            />
          </div>
        )}
        {visibleControls.emoji && (
          <EmojiButton showIcon={showIcon} />
        )}
        {visibleControls.caption && (
          <CaptionButton showIcon={showIcon} />
        )}
        {visibleControls.raiseHand && (
          <RaiseHandButton showIcon={showIcon} />
        )}
        {visibleControls.screenShare && browserSupportsScreenSharing && (
          <TrackToggle
            source={Track.Source.ScreenShare}
            captureOptions={{ audio: true, selfBrowserSurface: 'include' }}
            showIcon={showIcon}
            onChange={onScreenShareChange}
            onDeviceError={(error) => onDeviceError?.({ source: Track.Source.ScreenShare, error })}
          />
        )}
        {visibleControls.settings && (
          <SettingsMenuToggle>
            {showIcon && <GearIcon />}
          </SettingsMenuToggle>
        )}
        {visibleControls.moreOptions && (
          <MoreOptionsButton showIcon={showIcon} />
        )}
        {visibleControls.leave && (
          <DisconnectButton>
            {showIcon && <LeaveIcon />}
          </DisconnectButton>
        )}
        <StartMediaButton />
      </div>
      <div className="lk-controlbar-actions">
        {visibleControls.chat && (
          <ChatToggle className="lk-controlbar-action-icon">
            <span className="material-icons">chat</span>
          </ChatToggle>
        )}
        <button className="lk-controlbar-action-icon tools">
          <span className="material-icons">apps</span>
        </button>
        <button className="lk-controlbar-action-icon host">
          <span className="material-icons">admin_panel_settings</span>
        </button>
      </div>
      <Chat className={isChatOpen ? 'show' : ''} />
    </div>
  );
}
