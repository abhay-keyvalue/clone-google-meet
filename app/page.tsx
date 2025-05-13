'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import NavigationMenu from './components/NavigationMenu';
import LandingPage from './components/LandingPage';
import GoogleApps from './components/GoogleApps';
import ProfileButton from './components/ProfileButton';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Update time
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
      
      // Update date
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button 
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg focusable="false" viewBox="0 0 24 24" className={styles.menuIcon}>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </button>
          <div className={styles.logo}>
            <img 
              src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png"
              srcSet="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png 1x, https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png 2x"
              alt="Google Meet"
              width="124"
              height="40"
              className={styles.logoImage}
            />
            <span className={styles.meetText}>Meet</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.clock}>
            <svg viewBox="0 0 24 24" className={styles.clockIcon}>
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
            </svg>
            <div className={styles.dateTime}>
              <span className={styles.time}>{currentTime}</span>
              <span className={styles.date}>{currentDate}</span>
            </div>
          </div>
          <button className={styles.helpButton}>
            <svg viewBox="0 0 24 24" className={styles.helpIcon}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path>
            </svg>
          </button>
          <button className={styles.settingsButton}>
            <svg viewBox="0 0 24 24" className={styles.settingsIcon}>
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
            </svg>
          </button>
          <button className={styles.feedbackButton}>
            <span className={styles.materialIcon}>feedback</span>
          </button>
          <GoogleApps />
          <ProfileButton />
        </div>
      </header>

      <NavigationMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      <div className={`${styles.main} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <LandingPage />
      </div>
    </div>
  );
}
