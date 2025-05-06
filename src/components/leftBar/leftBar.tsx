import React from 'react';

const LeftBar: React.FC = () => {
  return (
    <aside className="w-72 min-h-screen bg-transparent p-4 flex flex-col">
      <div className="flex flex-col space-y-4 mt-4">
        {/* Meetings (selected) */}
        <div className="flex items-center space-x-4 bg-blue-100 rounded-full px-6 py-4">
          <span className="material-icons text-blue-600 text-3xl">event</span>
          <span className="text-blue-600 text-2xl font-medium">Meetings</span>
        </div>
        {/* Calls */}
        <div className="flex items-center space-x-4 px-6 py-4 cursor-pointer">
          <span className="material-icons text-gray-700 text-3xl">videocam</span>
          <span className="text-gray-800 text-2xl font-medium">Calls</span>
        </div>
      </div>
    </aside>
  );
};

export default LeftBar;
