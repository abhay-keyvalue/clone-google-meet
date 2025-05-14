import * as React from 'react';

interface SidePanelContainerProps {
  title: string;
  onClose: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SidePanelContainer({ title, onClose, icon, children, className }: SidePanelContainerProps) {
  return (
    <div className={`lk-side-panel ${className ?? ''}`.trim()}>
      <div className="lk-side-panel-header">
        <div className="lk-side-panel-title">
          {icon}
          <span>{title}</span>
        </div>
        <button className="lk-close-button" onClick={onClose} aria-label="Close">
          <span className="material-icons">close</span>
        </button>
      </div>
      <div className="lk-side-panel-content">
        {children}
      </div>
    </div>
  );
} 