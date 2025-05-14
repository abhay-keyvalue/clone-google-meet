import React from 'react';
import { useParticipants } from '../hooks/useParticipants';
import { useObservableState } from '../hooks/internal/useObservableState';
import { createIsSpeakingObserver, mutedObserver } from '@livekit/components-core';
import { ParticipantName } from './participant/ParticipantName';
import type { Participant } from 'livekit-client';

interface ArticulationListProps {
  title?: string;
}

function useSpeaking(participant: Participant) {
  return useObservableState(React.useMemo(() => createIsSpeakingObserver(participant), [participant]), false);
}

function useMuted(participant: Participant) {
  // Microphone muted status
  return useObservableState(
    React.useMemo(
      () => mutedObserver({ participant, source: 'microphone' as any }),
      [participant]
    ),
    true
  );
}

export const ArticulationList: React.FC<ArticulationListProps> = ({ title = 'Articulation List' }) => {
  const participants = useParticipants();

  return (
    <aside
      style={{
        width: 320,
        background: '#fff',
        borderRight: '1px solid #eee',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
        padding: '1rem',
      }}
    >
      <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 600 }}>{title}</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {participants.map((p) => {
          const isSpeaking = useSpeaking(p);
          const isMuted = useMuted(p);
          return (
            <li
              key={p.identity}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid #f0f0f0',
                background: isSpeaking ? '#e6f7ff' : undefined,
                fontWeight: isSpeaking ? 600 : 400,
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#d9d9d9',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                  fontWeight: 700,
                  fontSize: 16,
                  color: '#555',
                }}
              >
                {p.name?.[0]?.toUpperCase() || p.identity[0]?.toUpperCase() || '?'}
              </span>
              <div style={{ flex: 1 }}>
                <ParticipantName participant={p} />
                <div style={{ fontSize: 12, color: '#888' }}>
                  {isSpeaking ? 'Speaking' : isMuted ? 'Muted' : 'Idle'}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}; 