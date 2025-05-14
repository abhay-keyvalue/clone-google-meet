import type { TrackReference, TrackReferenceOrPlaceholder } from '@livekit/components-core';
import * as React from 'react';
import { TrackRefContext } from '../context/track-reference-context';
import { cloneSingleChild } from '../utils';
import { getTrackReferenceId } from '@livekit/components-core';

/** @public */
export interface TrackLoopProps {
  focusTrack?: any;
  /** Track references to loop over. You can the use `useTracks()` hook to get TrackReferences. */
  tracks: TrackReference[] | TrackReferenceOrPlaceholder[];
  /** The template component to be used in the loop. */
  children: React.ReactNode;
}

/**
 * The `TrackLoop` component loops over tracks. It is for example a easy way to loop over all participant camera and screen share tracks.
 * `TrackLoop` creates a `TrackRefContext` for each track that you can use to e.g. render the track.
 *
 * @example
 * ```tsx
 * const trackRefs = useTracks([Track.Source.Camera]);
 * <TrackLoop tracks={trackRefs} >
 *  <TrackRefContext.Consumer>
 *    {(trackRef) => trackRef && <VideoTrack trackRef={trackRef}/>}
 *  </TrackRefContext.Consumer>
 * </TrackLoop>
 * ```
 * @public
 */
export function TrackLoop({ tracks, focusTrack, ...props }: TrackLoopProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: focusTrack ? 'column' : 'row',
        height: (focusTrack || tracks.length <3) ? '100%' : '70%',
        gap: '15px',
        marginTop: (focusTrack || tracks.length <3) ? 0:'10%',
      }}
    >
      {tracks.map((trackReference) => {
        return (
          <div
            style={{
              width: focusTrack ? '100%' : `${100 / tracks.length}%`,
              height: '100%',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <TrackRefContext.Provider
              value={trackReference}
              key={getTrackReferenceId(trackReference)}
            >
              {cloneSingleChild(props.children)}
            </TrackRefContext.Provider>
          </div>
        );
      })}
    </div>
  );
}
