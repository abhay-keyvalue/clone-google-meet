import type { Room } from 'livekit-client';
import { ConnectionState } from 'livekit-client';
import * as React from 'react';
import { SpinnerIcon } from '../assets/icons';
import { useConnectionState } from '../hooks';
import { Toast } from './Toast';

/** @public */
export interface ConnectionStateToastProps extends React.HTMLAttributes<HTMLDivElement> {
  room?: Room;
}

/**
 * The `ConnectionStateToast` component displays a toast
 * notification indicating the current connection state of the room.
 * @public
 */
export function ConnectionStateToast(props: ConnectionStateToastProps) {
  const [notification, setNotification] = React.useState<React.ReactElement | undefined>(undefined);
  const state = useConnectionState(props.room);

  React.useEffect(() => {
    switch (state) {
      case ConnectionState.Reconnecting:
        setNotification(
          <>
            <SpinnerIcon className="lk-spinner" style={{marginRight: '10px'}} /> Reconnecting...
          </>,
        );
        break;
      case ConnectionState.Connecting:
        setNotification(
          <>
            <SpinnerIcon className="lk-spinner" style={{marginRight: '10px'}} /> Connecting to meeting...
          </>,
        );
        break;
      case ConnectionState.Disconnected:
        setNotification(<>Disconnected</>);
        break;
      default:
        setNotification(undefined);
        break;
    }
  }, [state]);
  return notification ? (
    <Toast
      style={{
        backgroundColor: '#181818',
        color: '#FFF',
        fontSize: '22px',
        zIndex: 1000,
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="lk-toast-connection-state"
    >
      {notification}
    </Toast>
  ) : (
    <></>
  );
}
