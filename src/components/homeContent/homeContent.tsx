import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeContent: React.FC = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate('/meeting');
  };

  return (
    <div className="flex flex-col items-center w-full mt-10">
      {/* Heading */}
      <h1 className="text-5xl font-light text-center mb-4">Secure video conferencing<br />for everyone</h1>
      <p className="text-xl text-center text-gray-600 mb-8">Connect, collaborate, and celebrate from anywhere with Google Meet</p>

      {/* Actions */}
      <div className="flex items-center space-x-4 mb-8">
        <button className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-700">
          <span className="material-icons mr-2">video_call</span>
          New meeting
        </button>
        <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-3">
          <input
            type="text"
            placeholder="Enter a code or nicknar"
            className="outline-none text-lg bg-transparent w-56"
          />
        </div>
        <button onClick={handleJoin} className="ml-2 bg-blue-600 text-white text-lg font-medium rounded-full px-6 py-3 hover:bg-blue-700 transition-colors">Join</button>
      </div>

      {/* Divider */}
      <hr className="w-full max-w-2xl border-t border-gray-200 mb-8" />

      {/* Illustration and Info */}
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center mb-6">
          <button className="text-2xl text-gray-400 px-4 py-2 rounded-full hover:bg-gray-100">&#60;</button>
          <img
            src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
            alt="Get a link you can share"
            className="h-56 w-56 mx-4"
          />
          <button className="text-2xl text-gray-400 px-4 py-2 rounded-full hover:bg-gray-100">&#62;</button>
        </div>
        <div className="flex space-x-2 mb-4">
          <span className="h-2 w-2 bg-blue-600 rounded-full inline-block"></span>
          <span className="h-2 w-2 bg-gray-300 rounded-full inline-block"></span>
          <span className="h-2 w-2 bg-gray-300 rounded-full inline-block"></span>
        </div>
        <h2 className="text-2xl font-medium mb-2">Get a link you can share</h2>
        <p className="text-gray-600 text-center mb-8 max-w-md">
          Click <span className="font-medium">New meeting</span> to get a link you can send to people you want to meet with
        </p>
        <a href="#" className="text-blue-600 text-sm hover:underline">Learn more about Google Meet</a>
      </div>
    </div>
  );
};

export default HomeContent;
