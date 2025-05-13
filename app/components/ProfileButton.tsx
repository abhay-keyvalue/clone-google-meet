'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../../styles/ProfileButton.module.css';

export default function ProfileButton() {
  const { data: session } = useSession();
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

  const userName = session?.user?.name || 'User';
  const userEmail = session?.user?.email || '';
  const userImage = session?.user?.image || 'https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png';

  return (
    <div className={styles.profileContainer} ref={dropdownRef}>
      <button
        className={styles.profileButton}
        onClick={handleClick}
        aria-label={`Google Account: ${userName} (${userEmail})`}
        aria-expanded={isOpen}
        role="button"
        tabIndex={0}
        type="button"
      >
        <img 
          className={styles.profileImage}
          src={userImage}
          srcSet={`${userImage} 1x, ${userImage} 2x`}
          alt=""
          aria-hidden="true"
        />
        <div className={styles.notificationIndicator}>
          <svg className={styles.notificationIcon} height="14" viewBox="0 0 14 14" width="14">
            <circle className={styles.notificationCircle} cx="7" cy="7" r="7"></circle>
            <path className={styles.notificationPath} d="M6 10H8V12H6V10ZM6 2H8V8H6V2Z"></path>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.profileInfo}>
            <div className={styles.profileHeader}>
              <img 
                className={styles.profileImageLarge}
                src={userImage}
                alt="Profile"
              />
              <div className={styles.profileDetails}>
                <div className={styles.profileName}>{userName}</div>
                <div className={styles.profileEmail}>{userEmail}</div>
              </div>
            </div>
          </div>
          <div className={styles.menuItems}>
            <div className={styles.menuItem}>
              <div className={styles.menuIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#5f6368"/>
                </svg>
              </div>
              <span>Manage your Google Account</span>
            </div>
            <div className={styles.menuItem}>
              <div className={styles.menuIcon}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#5f6368"/>
                </svg>
              </div>
              <span>Sign out</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 