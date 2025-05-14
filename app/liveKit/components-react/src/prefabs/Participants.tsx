import * as React from 'react';
import { useMaybeLayoutContext } from '../context';
import { useParticipants } from '../hooks/useParticipants';
import { ParticipantsToggle } from '../components/ParticipantsToggle';
import { ParticipantName } from '../components/participant/ParticipantName';
import { Track } from 'livekit-client';
import { useObservableState } from '../hooks/internal/useObservableState';
import { mutedObserver } from '@livekit/components-core';
import './Participants.css';

export interface ParticipantsProps extends React.HTMLAttributes<HTMLDivElement> {}

function ParticipantListItem({ participant }: { participant: any }) {
  const isMuted = useObservableState(
    React.useMemo(
      () => mutedObserver({ participant, source: 'microphone' as any }),
      [participant]
    ),
    true
  );

  // Video status (fixed)
  const cameraPublication = participant.getTrackPublication?.(Track.Source.Camera);
  const isVideoEnabled = cameraPublication && cameraPublication.isSubscribed && !cameraPublication.isMuted;

  // Role logic
  let role = '';
  if (participant.metadata?.toLowerCase().includes('host')) role = 'Host';
  if (participant.metadata?.toLowerCase().includes('presentation')) role = 'Presenting';

  // Avatar fallback with Google Meet style
  const avatar = participant.name?.[0]?.toUpperCase() || participant.identity[0]?.toUpperCase() || '?';
  
  return (
    <li className="participants-entry">
      <span className="participants-avatar">{avatar}</span>
      <div className="participants-info">
        <div className="participants-name">
          <ParticipantName participant={participant} />
          {participant.isLocal && <span className="participants-you"> (You)</span>}
        </div>
        {role && <div className="participants-role">{role}</div>}
      </div>
      {/* Mic status */}
      {isMuted ? (
        <span className="material-icons participants-muted" title="Mic off">mic_off</span>
      ) : (
        <span className="material-icons participants-muted" title="Mic on">mic</span>
      )}
      {/* Camera status */}
      {isVideoEnabled ? (
        <span className="material-icons participants-muted" title="Camera on">videocam</span>
      ) : (
        <span className="material-icons participants-muted" title="Camera off">videocam_off</span>
      )}
      <button className="participants-menu">
        <span className="material-icons">more_vert</span>
      </button>
    </li>
  );
}

export function Participants(props: ParticipantsProps) {
  const layoutContext = useMaybeLayoutContext();
  const show = layoutContext?.widget.state?.showParticipants;
  const participants = useParticipants();
  const [searchQuery, setSearchQuery] = React.useState('');

  if (!show) return null;

  const filteredParticipants = participants.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.identity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div {...props} className="lk-participants-panel" style={{ display: show ? 'flex' : 'none' }}>
      <div className="participants-header">
        <div className="participants-title">People</div>
        <ParticipantsToggle className="close-button">
          <span className="material-icons">close</span>
        </ParticipantsToggle>
      </div>
      
      <div className="participants-add-row">
        <button className="participants-add-btn">
          <span className="material-icons">person_add</span>
          Add people
        </button>
      </div>

      <div className="participants-search-row">
        <input 
          type="text" 
          className="participants-search" 
          placeholder="Search for people" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="participants-section-label">In the meeting</div>
      <div className="participants-section-header">
        <span className="participants-section-title">Contributors</span>
        <span className="participants-section-count">{filteredParticipants.length}</span>
      </div>

      <div className="participants-card">
        <ul className="participants-list">
          {filteredParticipants.map((p) => (
            <ParticipantListItem key={p.identity} participant={p} />
          ))}
        </ul>
      </div>
    </div>
  );
} 