import React from 'react';
import { sideBarLinks } from '../../../data/sidebarLinks';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

export const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`h-full p-4 flex flex-col gap-1 transition-all duration-300 ${
        isOpen ? "w-[250px]" : "w-full"
      } bg-blue-900 text-white shadow-lg`}
    >
      <span 
        className='self-end text-2xl font-bold sm:hidden'
        onClick={() => setIsSidebarOpen(false)}
      >
        <IoClose/>
      </span>
      <div className='w-full flex flex-col gap-3'>
        {sideBarLinks.map((link, id) => (
          <Link
            key={id}
            to={link?.path || "#"}
            className="w-full flex items-center gap-2 py-2 px-4 rounded-md text-white font-medium transition duration-300 hover:bg-blue-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiChevronRight className="text-lg" />
            <span className={`${isOpen ? "block" : "hidden"} md:block`}>
              {link?.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
