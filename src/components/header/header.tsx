import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
      {/* Left: Hamburger and Logo */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span className="material-icons">menu</span>
        </button>
        <img
          src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png"
          alt="Google Meet Logo"
          className="h-8"
        />
      </div>
      {/* Center: Spacer */}
      <div className="flex-1"></div>
      {/* Right: Time, Icons, Avatar */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 text-sm font-medium">5:15 PM • Tue, May 6</span>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span className="material-icons">help_outline</span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span className="material-icons">chat_bubble_outline</span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span className="material-icons">settings</span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span className="material-icons">apps</span>
        </button>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </header>
  );
};

export default Header;
