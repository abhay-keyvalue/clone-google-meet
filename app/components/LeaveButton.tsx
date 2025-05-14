'use client';

import React from 'react';

const LeaveButton: React.FC = () => {
  return (
    <button
      className="VYBDae-Bz112c-LgbsSe VYBDae-Bz112c-LgbsSe-OWXEXe-SfQLQb-suEOdc hk9qKe Iootmd vLQezd"
      role="button"
      aria-label="Leave call"
      data-tooltip-enabled="true"
      data-tooltip-id="tt-c159"
      data-tooltip-x-position="3"
      data-tooltip-y-position="2"
      data-tooltip-classes="PJU52b"
      data-use-native-focus-logic="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: '#ea4335',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#d93025';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#ea4335';
      }}
    >
      <span className="OiePBf-zPjgPe VYBDae-Bz112c-UHGRz" />
      <span className="RBHQF-ksKsZd" />
      <span className="VYBDae-Bz112c-kBDsod-Rtc0Jf" aria-hidden="true">
        <i className="quRWN-Bz112c google-symbols notranslate" aria-hidden="true">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '24px',
              height: '24px',
              fill: '#fff',
            }}
          >
            <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.66c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
          </svg>
        </i>
      </span>
      <div className="VYBDae-Bz112c-RLmnJb" />
    </button>
  );
};

export default LeaveButton; 