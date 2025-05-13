import React, { useState } from 'react';
import styles from '../../styles/NavigationMenu.module.css';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const [activeTab, setActiveTab] = useState<'meetings' | 'calls'>('meetings');

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div 
        className={styles.menu}
        role="dialog"
        aria-modal="false"
        aria-label="navigational drawer"
        aria-expanded={isOpen}
        aria-hidden={!isOpen}
      >
        <div className={styles.menuContent}>
          <ul 
            className={styles.menuList}
            role="listbox"
            tabIndex={0}
            aria-label="List of navigation tabs"
          >
            <li 
              className={`${styles.menuItem} ${activeTab === 'meetings' ? styles.active : ''}`}
              role="option"
              aria-selected={activeTab === 'meetings'}
              onClick={() => setActiveTab('meetings')}
              tabIndex={-1}
            >
              <span className={styles.menuItemRipple}></span>
              <span className={styles.menuItemFocusRing}></span>
              <span className={styles.menuIcon}>
                <i className="material-icons">event</i>
              </span>
              <span className={styles.menuTextContainer}>
                <span className={styles.menuText}>Meetings</span>
              </span>
            </li>
            <li 
              className={`${styles.menuItem} ${activeTab === 'calls' ? styles.active : ''}`}
              role="option"
              aria-selected={activeTab === 'calls'}
              onClick={() => setActiveTab('calls')}
              tabIndex={-1}
            >
              <span className={styles.menuItemRipple}></span>
              <span className={styles.menuItemFocusRing}></span>
              <span className={styles.menuIcon}>
                <i className="material-icons">videocam</i>
              </span>
              <span className={styles.menuTextContainer}>
                <span className={styles.menuText}>Calls</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
} 