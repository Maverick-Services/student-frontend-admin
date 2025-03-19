import React from 'react';
import { sideBarLinks } from '../../../data/sidebarLinks';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

export const Sidebar = ({ isOpen, setIsSidebarOpen }) => {

  const location = useLocation();

  return (
    <div
      className={`h-full overflow-y-auto p-4 flex flex-col gap-1 transition-all duration-300 ${
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
            className={`w-full flex flex-col gap-2 text-white font-medium transition duration-300 `}
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className={`w-full flex items-center gap-2 py-2 px-4 rounded-md hover:bg-blue-700 ${(location.pathname.includes(link?.path) && "bg-blue-700") ? (location.pathname.includes(link?.path) && "bg-blue-700") : (location.pathname.includes(link?.name?.toLocaleLowerCase()) && "bg-blue-700")}`}>
              {/* <FiChevronRight className="text-lg" /> */}
              <span className={`${isOpen ? "block" : "hidden"} md:block`}>
                {link?.name}
              </span>
            </div>

            {/* SubTabs */}
            <div className='w-full flex flex-col gap-3'>
            {link?.subtabs && link?.subtabs.map((st, id) => (
              <Link
                key={id}
                to={st?.path || "#"}
                className={`w-full flex items-center gap-2 py-2 px-4 rounded-md text-white font-medium transition duration-300 hover:bg-blue-800 ${location.pathname.includes(st?.path) && "bg-blue-800"} text-sm`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <FiChevronRight className="" />
                <span className={`${isOpen ? "block" : "hidden"} md:block`}>
                  {st?.name}
                </span>
              </Link>
            ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
