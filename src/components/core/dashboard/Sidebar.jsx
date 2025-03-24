import React, { useContext } from 'react';
import { sideBarLinks } from '../../../data/sidebarLinks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { FaCalendarAlt } from "react-icons/fa";

import { IoClose } from 'react-icons/io5';
import Logo from '../../../assets/logo.svg'
import { logout } from '../../../services/operations/authAPI';
import { AuthContext } from '../../../Context/AuthContext';


export const Sidebar = ({ isOpen, setIsSidebarOpen, setShowCalender }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAdmin, setToken } = useContext(AuthContext);

  return (
    <div
      className={`h-screen overflow-y-auto p-4 pt-2 flex flex-col justify-between gap-1 transition-all duration-300 ${isOpen ? "w-[250px]" : "w-full"
        } bg-white text-black shadow-lg`}
    >
      <span
        className='self-end text-2xl font-bold sm:hidden'
        onClick={() => setIsSidebarOpen(false)}
      >
        <IoClose />
      </span>
      <div className='w-full flex flex-col gap-3'>
        <div className='w-full py-3 mb-2'>
          <img src={Logo} alt="logo" className='w-[80%] mx-auto' />
        </div>

        <div className="flex flex-col gap-3">
          {sideBarLinks.map((link, id) => {
            // const isActive = location.pathname.split('/').includes(link?.path) || location.pathname.split('/').includes(link?.name?.toLowerCase());
            const isActive = location.pathname == link?.path;
            // console.log(location.pathname, link?.path)
            const Icon = link.icon;
            return (
              <Link
                key={id}
                onClick={() => setIsSidebarOpen(false)}
                to={link?.path || "#"}
                className={`w-full flex items-center gap-3 py-2 px-4 rounded-md font-medium transition duration-300 ${isActive ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                  }`}
              >
                {/* Render the icon */}
                <span className="text-xl">
                  <Icon />
                </span>
                {/* Render the name */}
                <span className={`${isOpen ? "block" : "hidden"} md:block`}>
                  {link?.name}
                </span>
              </Link>
            );
          })}
          <button
            className={`w-full flex items-center gap-2 py-2 px-4 rounded-md font-medium transition duration-300 cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900`}
            onClick={() => setShowCalender(true)}
          >
            <FaCalendarAlt />
            <span className={`${isOpen ? "block" : "hidden"} md:block`}>
              Calendar
            </span>
          </button>
        </div>

      </div>
      <button
        onClick={() => logout(navigate, setAdmin, setToken)}
        className="bg-blue-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-300 hover:text-[#1C398E] transition cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};
