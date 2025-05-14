import * as React from 'react';
import { useParticipantsToggle } from '../hooks/useChatToggle';

export interface ParticipantsToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ParticipantsToggle: React.FC<ParticipantsToggleProps> = React.forwardRef<HTMLButtonElement, ParticipantsToggleProps>(
  function ParticipantsToggle(props, ref) {
    const { mergedProps } = useParticipantsToggle({ props });
    return (
      <button ref={ref} {...mergedProps}>
        {props.children ?? <span className="material-icons">group</span>}
      </button>
    );
  }
); 