import * as React from 'react';
import { EmojiButton as EmojiIcon } from '../../assets/icons';

export interface EmojiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showIcon?: boolean;
}

export function EmojiButton({ showIcon = true, ...props }: EmojiButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const emojis = ['👍', '❤️', '😂', '😮', '😢', '👏', '🙏', '🎉'];

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="lk-button"
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
          ...props.style,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#5f6368';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#3c4043';
        }}
      >
        {showIcon && <EmojiIcon />}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#202124',
            borderRadius: '8px',
            padding: '8px',
            display: 'flex',
            gap: '8px',
            boxShadow: '0 2px 6px 2px rgba(60,64,67,.15)',
            zIndex: 1000,
          }}
        >
          {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => {
                // Handle emoji selection
                setIsOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#3c4043';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 