import * as React from 'react';
import type { Participant } from 'livekit-client';
import { Track } from 'livekit-client';
import type { ParticipantClickEvent, TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { isTrackReference, isTrackReferencePinned } from '@livekit/components-core';
import { ConnectionQualityIndicator } from './ConnectionQualityIndicator';
import { ParticipantName } from './ParticipantName';
import { TrackMutedIndicator } from './TrackMutedIndicator';
import {
  ParticipantContext,
  TrackRefContext,
  useEnsureTrackRef,
  useFeatureContext,
  useMaybeLayoutContext,
  useMaybeParticipantContext,
  useMaybeTrackRefContext,
} from '../../context';
import { FocusToggle } from '../controls/FocusToggle';
import { ParticipantPlaceholder } from '../../assets/images';
import { LockLockedIcon, ScreenShareIcon } from '../../assets/icons';
import { VideoTrack } from './VideoTrack';
import { AudioTrack } from './AudioTrack';
import { useParticipantTile, useTrackToggle } from '../../hooks';
import { useIsEncrypted } from '../../hooks/useIsEncrypted';

/**
 * The `ParticipantContextIfNeeded` component only creates a `ParticipantContext`
 * if there is no `ParticipantContext` already.
 * @example
 * ```tsx
 * <ParticipantContextIfNeeded participant={trackReference.participant}>
 *  ...
 * </ParticipantContextIfNeeded>
 * ```
 * @public
 */
export function ParticipantContextIfNeeded(
  props: React.PropsWithChildren<{
    participant?: Participant;
  }>,
) {
  const hasContext = !!useMaybeParticipantContext();
  return props.participant && !hasContext ? (
    <ParticipantContext.Provider value={props.participant}>
      {props.children}
    </ParticipantContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

/**
 * Only create a `TrackRefContext` if there is no `TrackRefContext` already.
 * @internal
 */
export function TrackRefContextIfNeeded(
  props: React.PropsWithChildren<{
    trackRef?: TrackReferenceOrPlaceholder;
  }>,
) {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? (
    <TrackRefContext.Provider value={props.trackRef}>{props.children}</TrackRefContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

/** @public */
export interface ParticipantTileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The track reference to display. */
  trackRef?: TrackReferenceOrPlaceholder;
  disableSpeakingIndicator?: boolean;

  onParticipantClick?: (event: ParticipantClickEvent) => void;
}

/**
 * The `ParticipantTile` component is the base utility wrapper for displaying a visual representation of a participant.
 * This component can be used as a child of the `TrackLoop` component or by passing a track reference as property.
 *
 * @example Using the `ParticipantTile` component with a track reference:
 * ```tsx
 * <ParticipantTile trackRef={trackRef} />
 * ```
 * @example Using the `ParticipantTile` component as a child of the `TrackLoop` component:
 * ```tsx
 * <TrackLoop>
 *  <ParticipantTile />
 * </TrackLoop>
 * ```
 * @public
 */
export const ParticipantTile: (
  props: ParticipantTileProps & React.RefAttributes<HTMLDivElement>,
) => React.ReactNode = /* @__PURE__ */ React.forwardRef<HTMLDivElement, ParticipantTileProps>(
  function ParticipantTile(
    {
      trackRef,
      children,
      onParticipantClick,
      disableSpeakingIndicator,
      ...htmlProps
    }: ParticipantTileProps,
    ref,
  ) {
    const trackReference = useEnsureTrackRef(trackRef);

    const { enabled: isCameraEnabled } = useTrackToggle({ source: Track.Source.Camera });

    const { elementProps } = useParticipantTile<HTMLDivElement>({
      htmlProps,
      disableSpeakingIndicator,
      onParticipantClick,
      trackRef: trackReference,
    });
    const isEncrypted = useIsEncrypted(trackReference.participant);
    const layoutContext = useMaybeLayoutContext();

    const autoManageSubscription = useFeatureContext()?.autoSubscription;

    const handleSubscribe = React.useCallback(
      (subscribed: boolean) => {
        if (
          trackReference.source &&
          !subscribed &&
          layoutContext &&
          layoutContext.pin.dispatch &&
          isTrackReferencePinned(trackReference, layoutContext.pin.state)
        ) {
          layoutContext.pin.dispatch({ msg: 'clear_pin' });
        }
      },
      [trackReference, layoutContext],
    );

    const renderVideo = () => {
      return (
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '-5%',
            bottom: '0px',
            right: '0px',
            width: '110%',
            height: '100%',
            zIndex: '100',
          }}
        >
          {isTrackReference(trackReference) &&
          (trackReference.publication?.kind === 'video' ||
            trackReference.source === Track.Source.Camera ||
            trackReference.source === Track.Source.ScreenShare) ? (
            <VideoTrack
              trackRef={trackReference}
              onSubscriptionStatusChanged={handleSubscribe}
              manageSubscription={autoManageSubscription}
            />
          ) : (
            isTrackReference(trackReference) && (
              <AudioTrack trackRef={trackReference} onSubscriptionStatusChanged={handleSubscribe} />
            )
          )}
        </div>
      );
    };

    const renderPlaceholder = () => {
      return (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {renderVideo()}
          {/* {isCameraEnabled ? renderVideo() : <ParticipantPlaceholder />} */}
          {renderVideoControls()}
        </div>
      );
    };

    const renderVideoControls = () => {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            bottom: '0',
            left: '0',
            padding: '10px',
            zIndex: '101',
          }}
          className="lk-participant-metadata"
        >
          <div
            className="lk-participant-metadata-item"
            style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}
          >
            {trackReference.source === Track.Source.Camera ? (
              <>
                <ParticipantName />
                {isEncrypted && <LockLockedIcon style={{ marginRight: '0.25rem' }} />}
                <TrackMutedIndicator
                  trackRef={{
                    participant: trackReference.participant,
                    source: Track.Source.Microphone,
                  }}
                  show={'muted'}
                ></TrackMutedIndicator>
                <ConnectionQualityIndicator className="lk-participant-metadata-item" />
                <FocusToggle trackRef={trackReference} />
              </>
            ) : (
              <>
                <ParticipantName>&apos;s screen</ParticipantName>
                <ScreenShareIcon style={{ marginRight: '0.25rem', color: 'white' }} />
              </>
            )}
          </div>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: '10px',
          overflow: 'hidden',
          borderRadius: '10px',
          background: 'rgba(0, 0, 0, 0.3)',
        }}
        {...elementProps}
      >
        <TrackRefContextIfNeeded trackRef={trackReference}>
          <ParticipantContextIfNeeded participant={trackReference.participant}>
            {children ?? renderPlaceholder()}
          </ParticipantContextIfNeeded>
        </TrackRefContextIfNeeded>
      </div>
    );
  },
);

function generateBackgroundColor() {
  // Array of gradient backgrounds inspired by the sample UIs
  const gradients = [
    'radial-gradient(circle at 60% 40%, #4b5c77 0%, #1a2636 100%)', // blue/gray
    'radial-gradient(circle at 60% 40%, #8e44ad 0%, #3d0c4c 100%)', // purple
    'radial-gradient(circle at 60% 40%, #6a11cb 0%, #2575fc 100%)', // blue/purple
    'radial-gradient(circle at 60% 40%, #ff6a00 0%, #ee0979 100%)', // orange/pink
    'radial-gradient(circle at 60% 40%, #43cea2 0%, #185a9d 100%)', // teal/blue
  ];
  // Pick a random gradient
  return gradients[Math.floor(Math.random() * gradients.length)];
}
