import React from 'react';
import styles from '../../../styles/SlideSwitch.module.css';

interface SlideSwitchProps {
  isOn: boolean;
  onChange: () => void;
  label?: string;
}

export default function SlideSwitch({ isOn, onChange, label }: SlideSwitchProps) {
  return (
    <div className={styles.switchContainer}>
      {label && <span className={styles.label}>{label}</span>}
      <button
        className={`${styles.switch} ${isOn ? styles.on : ''}`}
        onClick={onChange}
        role="switch"
        aria-checked={isOn}
        aria-label={label || 'Toggle switch'}
      >
        <div className={styles.slider} />
      </button>
    </div>
  );
} 