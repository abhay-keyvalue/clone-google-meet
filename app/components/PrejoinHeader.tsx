'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const LOGO_URL = 'https://www.gstatic.com/meet/meet_logo_dark_2020q4_8955caafa87e403c96e24e8aa63f2433.svg';

const PrejoinHeader: React.FC = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchAndPersistUsername = async () => {
      try {
        // First check localStorage
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
          setUsername(savedUsername);
        }

        // Then fetch from session
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          const sessionUsername = data.user?.name || 'Anonymous User';
          setUsername(sessionUsername);
          // Persist to localStorage
          localStorage.setItem('username', sessionUsername);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
        const fallbackUsername = 'Anonymous User';
        setUsername(fallbackUsername);
        localStorage.setItem('username', fallbackUsername);
      }
    };

    fetchAndPersistUsername();
  }, []);

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      background: '#fff',
      minHeight: 64,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={LOGO_URL} alt="Meet Logo" style={{ height: 32 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{
          marginRight: 8,
          color: 'rgb(32, 33, 36)',
          cursor: 'default',
          direction: 'ltr',
          display: 'block',
          fontFamily: 'Roboto, arial, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '16px',
          textAlign: 'right',
          width: 160,
          WebkitFontSmoothing: 'antialiased',
          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        }}>
          <div style={{paddingBottom: '4px'}}>{username}</div>
          <div style={{color: '#5f6368', cursor: 'pointer'}}>Switch account</div>
        </div>
        <img 
          src={session?.user?.image || 'https://api.dicebear.com/7.x/bottts/svg?seed=default'} 
          alt={username} 
          style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#f0f0f0' }} 
        />
      </div>
    </header>
  );
};

export default PrejoinHeader;
