import React from 'react';
import { FaMicrophone, FaVideo, FaDesktop, FaRegSmile, FaPhoneSlash, FaUserPlus, FaComments, FaTh, FaLock } from 'react-icons/fa';

const Meeting: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Video Area */}
      <div className="flex-1 flex items-center justify-center relative bg-gray-800">
        <video 
          className="rounded-lg w-auto h-[80%] object-cover"
          autoPlay
          muted
          loop
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        >
          Your browser does not support the video tag.
        </video>

        {/* Meeting Info Card */}
        <div className="absolute top-4 left-4 bg-white text-black p-4 rounded-lg shadow-lg w-72">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Your meeting's ready</span>
            <button className="text-gray-600 hover:text-black">✕</button>
          </div>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center">
            <FaUserPlus className="mr-2" /> Add others
          </button>
          <div className="mt-3 text-sm">
            Or share this info:
            <div className="mt-1">
              <strong>Link:</strong> meet.google.com/gbo-zdxv-rto
              <br />
              <strong>Dial-in:</strong> +1 925-587-3904
              <br />
              <strong>PIN:</strong> 538 202 823#
            </div>
            <a href="#" className="text-blue-600 mt-2 inline-block">More phone numbers</a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6 p-4 bg-gray-800 border-t border-gray-700">
        <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
          <FaMicrophone />
        </button>
        <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
          <FaVideo />
        </button>
        <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
          <FaDesktop />
        </button>
        <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
          <FaRegSmile />
        </button>
        <button className="bg-red-600 p-3 rounded-full hover:bg-red-700">
          <FaPhoneSlash />
        </button>
        <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
          <FaUserPlus />
        </button>
        <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
          <FaComments />
        </button>
        <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
          <FaTh />
        </button>
        <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
          <FaLock />
        </button>
      </div>
    </div>
  );
};

export default Meeting;
