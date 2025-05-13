'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { generateRoomId } from '@/lib/client-utils';
import styles from '../styles/Home.module.css';

export default function Page() {
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const startNewMeeting = () => {
    router.push(`/rooms/${generateRoomId()}`);
  };

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingCode.trim()) {
      router.push(`/rooms/${meetingCode.trim()}`);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/images/google-meet-logo.svg" alt="Google Meet" width="120" height="40" />
        </div>
        <div className={styles.headerRight}>
          <span className={styles.time}>{new Date().toLocaleTimeString()}</span>
          <button className={styles.helpButton}>
            <span>?</span>
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Premium video meetings. Now free for everyone.</h1>
          <p>We re-engineered the service we built for secure business meetings, Google Meet, to make it free and available for all.</p>
        </div>

        <div className={styles.meetingActions}>
          <div className={styles.newMeeting}>
            <button 
              className={styles.newMeetingButton}
              onClick={startNewMeeting}
            >
              <span className={styles.icon}>+</span>
              New meeting
            </button>
          </div>

          <div className={styles.joinMeeting}>
            <form onSubmit={joinMeeting}>
              <input
                type="text"
                placeholder="Enter a code or link"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                className={styles.meetingInput}
              />
              <button 
                type="submit"
                className={styles.joinButton}
                disabled={!meetingCode.trim()}
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>Get a link you can share</h3>
            <p>Click <strong>New meeting</strong> to get a link you can send to people you want to meet with</p>
          </div>
          <div className={styles.feature}>
            <h3>Your meetings are safe</h3>
            <p>No one can join a meeting unless invited or admitted by the host</p>
          </div>
          <div className={styles.feature}>
            <h3>Plan ahead</h3>
            <p>Set up meetings in advance and share the link with others</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <span>Learn more about</span>
            <a href="https://meet.google.com/about" target="_blank" rel="noopener">Google Meet</a>
          </div>
          <div className={styles.footerRight}>
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy</a>
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
