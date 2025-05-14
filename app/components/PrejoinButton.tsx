'use client';

import React, { useState, useEffect } from 'react';

interface PrejoinButtonProps {
  onProfileLoad?: (username: string) => void;
}

const PrejoinButton: React.FC<PrejoinButtonProps> = ({ onProfileLoad }) => {
  const [profile, setProfile] = useState<{ username: string; avatar: string } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        const username = `${user.name.first} ${user.name.last}`;
        const avatar = user.picture.thumbnail;
        
        setProfile({ username, avatar });
        onProfileLoad?.(username);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [onProfileLoad]);

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
        aria-label={`Google Account: ${profile?.username || 'User'}`}
        role="button"
        tabIndex={0}
      >
        <img 
          src={profile?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=default'}
          srcSet={`${profile?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=default'} 1x, ${profile?.avatar?.replace('thumbnail', 'large') || 'https://api.dicebear.com/7.x/bottts/svg?seed=default'} 2x`}
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
            <div style={{ fontWeight: 500 }}>{profile?.username || 'User'}</div>
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