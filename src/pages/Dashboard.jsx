import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/core/dashboard/Sidebar';
import { FiMenu } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import calender from '../assets/calender.jpeg'

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCalender, setShowCalender] = useState(false);

  return (
    <div className='w-full h-full relative'>
      <Navbar/>
      <div className="relative flex items-start w-full h-full overflow-hidden bg-gray-200">
        {/* Sidebar - Responsive */}
        <div
          className={`absolute md:relative  transition-all duration-300 h-full ${
            isSidebarOpen ? "w-[250px] h-fit" : "max-md:w-[70px] w-[250px] max-md:h-0 max-md:overflow-hidden"
          } bg-blue-900 text-white shadow-lg flex flex-col`}
        >
          <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} 
            setShowCalender={setShowCalender} />
        </div>
        {/* Mobile Menu Button */}
        
        {
          !isSidebarOpen &&
          <button
            className="absolute top-1 left-[5%] md:hidden z-50 bg-blue-900 p-2 rounded-md shadow-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiMenu size={24} className="text-white" />
          </button>
        }

        {/* Main Content */}
        <div className="flex-grow overflow-x-hidden overflow-y-auto flex bg-gray-100 justify-center items-start pb-20  w-full h-full">
          <div className="w-11/12 py-14 sm:py-8 rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
      {
        // showCalender &&
        <div
          onClick={() => setShowCalender(false)} 
          className={`absolute bottom-0 bg-black/70 backdrop:backdrop-blur-2xl transition-all duration-300 ${
          !showCalender ? "w-0 h-0 -z-50" : "w-full h-full z-50"
        } flex items-center justify-center cursor-pointer`}>
          <img src={calender} className='h-[90%] w-[90%] sm:w-[40%]' />
        </div>
      }
    </div>
  );
};

export default Dashboard;
