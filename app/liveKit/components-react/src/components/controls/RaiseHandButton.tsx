import * as React from 'react';

export interface RaiseHandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showIcon?: boolean;
}

export function RaiseHandButton({ showIcon = true, ...props }: RaiseHandButtonProps) {
  const [isRaised, setIsRaised] = React.useState(false);

  return (
    <button
      className="lk-button VYBDae-Bz112c-LgbsSe VYBDae-Bz112c-LgbsSe-OWXEXe-SfQLQb-suEOdc"
      {...props}
      onClick={() => setIsRaised(!isRaised)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: isRaised ? '#1a73e8' : '#3c4043',
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative',
        ...props.style,
      }}
      onMouseOver={(e) => {
        if (!isRaised) {
          e.currentTarget.style.backgroundColor = '#5f6368';
        }
      }}
      onMouseOut={(e) => {
        if (!isRaised) {
          e.currentTarget.style.backgroundColor = '#3c4043';
        }
      }}
    >
      {showIcon && (
        <span className="material-icons" style={{ fontSize: '24px', color: '#fff' }}>
          pan_tool
        </span>
      )}
      {isRaised && (
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