import React from 'react';

const LOGO_URL = 'https://www.gstatic.com/meet/meet_logo_dark_2020q4_8955caafa87e403c96e24e8aa63f2433.svg';
const AVATAR_URL = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg';

const PrejoinHeader: React.FC = () => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      background: '#fff',
      minHeight: 64,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={LOGO_URL} alt="Meet Logo" style={{ height: 32 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{
          marginRight: 8,
          color: 'rgb(32, 33, 36)',
          cursor: 'default',
          direction: 'ltr',
          display: 'block',
          fontFamily: 'Roboto, arial, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '16px',
          textAlign: 'right',
          width: 160,
          WebkitFontSmoothing: 'antialiased',
          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        }}>
          <div style={{paddingBottom: '4px'}}>abhay@keyvalue.systems</div>
          <div>Switch account</div>
        </div>
        <img src={AVATAR_URL} alt="AB" style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#f0f0f0' }} />
      </div>
    </header>
  );
};

export default PrejoinHeader;
