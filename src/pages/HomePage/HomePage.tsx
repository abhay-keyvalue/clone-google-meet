import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import LeftBar from '../../components/leftBar/leftBar';
import HomeContent from '../../components/homeContent/homeContent';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page w-full min-h-screen bg-white">
      <Header />
      <div className="flex">
        <LeftBar />
        <div className="flex-1 flex justify-center">
          <HomeContent />
        </div>
      </div>
    </div>
  );
};

export default HomePage; 