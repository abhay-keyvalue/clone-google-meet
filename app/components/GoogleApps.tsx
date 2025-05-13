'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/GoogleApps.module.css';

export default function GoogleApps() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.appsContainer} ref={dropdownRef}>
      <button
        className={styles.appsButton}
        onClick={handleClick}
        aria-label="Google apps"
        aria-expanded={isOpen}
        role="button"
        tabIndex={0}
        type="button"
      >
        <svg className={styles.appsIcon} focusable="false" viewBox="0 0 24 24">
          <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.appsGrid}>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335"/>
                </svg>
              </div>
              <span>Gmail</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M4 20h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2z" fill="#4285F4"/>
                </svg>
              </div>
              <span>Drive</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" fill="#4285F4"/>
                </svg>
              </div>
              <span>Calendar</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H7v-4h4v4zm0-5H7V7h4v4zm5 5h-4v-4h4v4zm0-5h-4V7h4v4z" fill="#00897B"/>
                </svg>
              </div>
              <span>Meet</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="#00BCD4"/>
                </svg>
              </div>
              <span>Chat</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#4285F4"/>
                </svg>
              </div>
              <span>Contacts</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" fill="#4285F4"/>
                </svg>
              </div>
              <span>Docs</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#0F9D58"/>
                </svg>
              </div>
              <span>Sheets</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#F4B400"/>
                </svg>
              </div>
              <span>Slides</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="#4285F4"/>
                </svg>
              </div>
              <span>Photos</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4"/>
                </svg>
              </div>
              <span>Maps</span>
            </div>
            <div className={styles.appItem}>
              <div className={styles.appIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" fill="#4285F4"/>
                </svg>
              </div>
              <span>Translate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 