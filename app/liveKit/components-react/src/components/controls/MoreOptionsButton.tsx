import * as React from 'react';
import { MoreOptionsIcon } from '../../assets/icons';

export interface MoreOptionsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showIcon?: boolean;
}

export function MoreOptionsButton({ showIcon = true, ...props }: MoreOptionsButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const options = [
    { label: 'Change layout', icon: '📐' },
    { label: 'Start recording', icon: '🎥' },
    { label: 'Turn on captions', icon: '📝' },
    { label: 'Show everyone', icon: '👥' },
    { label: 'Settings', icon: '⚙️' },
    { label: 'Help & feedback', icon: '❓' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="lk-button VYBDae-Bz112c-LgbsSe VYBDae-Bz112c-LgbsSe-OWXEXe-SfQLQb-suEOdc"
        {...props}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          background: '#3c4043',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          position: 'relative',
          ...props.style,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#5f6368';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#3c4043';
        }}
      >
        {showIcon && <MoreOptionsIcon />}
        <span 
          style={{
            position: 'absolute',
            bottom: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#fff',
            fontSize: '16px',
            transition: 'transform 0.2s',
          }}
        >
          <i className="google-material-icons"></i>
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '0',
            background: '#202124',
            borderRadius: '8px',
            padding: '8px 0',
            minWidth: '200px',
            boxShadow: '0 2px 6px 2px rgba(60,64,67,.15)',
            zIndex: 1000,
          }}
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                // Handle option selection
                setIsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px 16px',
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#3c4043';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span style={{ marginRight: '12px', fontSize: '16px' }}>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 