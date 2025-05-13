import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/LandingPage.module.css';
import FeatureCarousel from './FeatureCarousel';
import GoogleApps from './GoogleApps';

export default function LandingPage() {
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const startNewMeeting = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/rooms/${randomCode}`);
  };

  const scheduleMeeting = () => {
    window.open('https://calendar.google.com/calendar/u/0/r/eventedit', '_blank');
  };

  const joinMeeting = () => {
    if (meetingCode.trim()) {
      setIsJoining(true);
      router.push(`/rooms/${meetingCode.trim()}`);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Secure video conferencing for anyone</h1>
          <p>Connect, collaborate and celebrate from anywhere with Google Meet.</p>
        </div>

        <div className={styles.meetingActions}>
          <div className={styles.newMeetingWrapper} ref={dropdownRef}>
            <button 
              className={styles.newMeetingButton} 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className={styles.icon}>+</span>
              New meeting
            </button>
            {showDropdown && (
              <div className={styles.dropdown}>
                <button 
                  className={styles.dropdownItem}
                  onClick={startNewMeeting}
                >
                  <i className="material-icons">videocam</i>
                  <span>Start an instant meeting</span>
                </button>
                <button 
                  className={styles.dropdownItem}
                  onClick={scheduleMeeting}
                >
                  <i className="material-icons">event</i>
                  <span>Schedule in Google Calendar</span>
                </button>
              </div>
            )}
          </div>
          <div className={styles.joinMeeting}>
            <div className={styles.joinInputWrapper}>
              <i className="material-icons" aria-hidden="true">keyboard</i>
              <span className={styles.joinInputContainer}>
                <input
                  type="text"
                  value={meetingCode}
                  onChange={(e) => setMeetingCode(e.target.value)}
                  className={styles.joinInput}
                  placeholder="Enter a code or nickname"
                  spellCheck="false"
                  maxLength={50}
                  autoComplete="off"
                  aria-label="Enter a code or nickname"
                />
              </span>
            </div>
            <button 
              className={styles.joinButton}
              onClick={joinMeeting}
              disabled={!meetingCode.trim()}
            >
              Join
            </button>
          </div>
        </div>

        <FeatureCarousel />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <span>© 2024 Google Meet</span>
          </div>
          <div className={styles.footerRight}>
            <a href="https://meet.google.com/about">Learn more about Google Meet</a>
            <a href="https://policies.google.com/privacy">Privacy</a>
            <a href="https://policies.google.com/terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 