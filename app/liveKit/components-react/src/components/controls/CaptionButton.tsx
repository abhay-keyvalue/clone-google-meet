import * as React from 'react';
import { CaptionIcon } from '../../assets/icons';

export interface CaptionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showIcon?: boolean;
}

export function CaptionButton({ showIcon = true, ...props }: CaptionButtonProps) {
  const [isEnabled, setIsEnabled] = React.useState(false);

  return (
    <button
      className="lk-button VYBDae-Bz112c-LgbsSe VYBDae-Bz112c-LgbsSe-OWXEXe-SfQLQb-suEOdc"
      {...props}
      onClick={() => setIsEnabled(!isEnabled)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: isEnabled ? '#1a73e8' : '#3c4043',
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative',
        ...props.style,
      }}
      onMouseOver={(e) => {
        if (!isEnabled) {
          e.currentTarget.style.backgroundColor = '#5f6368';
        }
      }}
      onMouseOut={(e) => {
        if (!isEnabled) {
          e.currentTarget.style.backgroundColor = '#3c4043';
        }
      }}
    >
      {showIcon && <CaptionIcon />}
      {isEnabled && (
        <span 
          style={{
            position: 'absolute',
            bottom: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#1a73e8',
            fontSize: '16px',
          }}
        >
          <span className="material-icons">check_circle</span>
        </span>
      )}
    </button>
  );
} 