'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

interface PrejoinButtonProps {
  onProfileLoad?: (username: string) => void;
}

const PrejoinButton: React.FC<PrejoinButtonProps> = ({ onProfileLoad }) => {
  const { data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);

  React.useEffect(() => {
    if (session?.user?.name) {
      onProfileLoad?.(session.user.name);
    }
  }, [session, onProfileLoad]);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px',
          borderRadius: '50%',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          position: 'relative',
        }}
        aria-expanded={isExpanded}
        aria-label={`Google Account: ${session?.user?.name || 'User'}`}
        role="button"
        tabIndex={0}
      >
        <img 
          src={session?.user?.image || 'https://api.dicebear.com/7.x/bottts/svg?seed=default'}
          alt=""
          aria-hidden="true"
          data-noaft=""
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '14px',
            height: '14px',
            background: '#fff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <svg height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="7" r="7" fill="#fff"/>
            <path d="M6 10H8V12H6V10ZM6 2H8V8H6V2Z" fill="#5f6368"/>
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          marginTop: '8px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          padding: '8px 0',
          minWidth: '200px',
          zIndex: 1000,
        }}>
          <div style={{
            padding: '8px 16px',
            borderBottom: '1px solid #dadce0',
          }}>
            <div style={{ fontWeight: 500 }}>{session?.user?.name || 'User'}</div>
            <div style={{ color: '#5f6368', fontSize: '14px' }}>Join meeting</div>
          </div>
          <button
            onClick={() => {
              // TODO: Implement join meeting
              console.log('Join meeting clicked');
            }}
            style={{
              width: '100%',
              padding: '8px 16px',
              textAlign: 'left',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#1f1f1f',
              fontSize: '14px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Join now
          </button>
        </div>
      )}
    </div>
  );
};

export default PrejoinButton; 