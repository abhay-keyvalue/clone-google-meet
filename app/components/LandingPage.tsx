import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/LandingPage.module.css';
import FeatureCarousel from './FeatureCarousel';

export default function LandingPage() {
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const startNewMeeting = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/rooms/${randomCode}`);
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
          <h1>Video calls with anyone, anywhere</h1>
          <p>Stay connected with friends and family, or collaborate with colleagues.</p>
        </div>

        <div className={styles.meetingActions}>
          <button className={styles.newMeetingButton} onClick={startNewMeeting}>
            <span className={styles.icon}>+</span>
            New meeting
          </button>
          <div className={styles.joinMeeting}>
            <input
              type="text"
              placeholder="Enter meeting code"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              className={styles.meetingInput}
            />
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