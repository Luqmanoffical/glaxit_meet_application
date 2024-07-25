import React , {useState} from "react";
import { Link, NavLink } from "react-router-dom";
import {Logo} from '../index'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { generateAvatar } from '../generateAvatar'
import ProfileModal from '../ProfileModal'
export default function Header() {
  
  const dispatch = useDispatch();
    const { userData, status } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleLogout = () => {
        dispatch(logout());
        setDropdownOpen(false);
    };
    const profileImage = userData?.username ? generateAvatar(userData.username) : 'path_to_default_image';

  
  
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
          <Logo width="40%" />
          </Link>
          <div className="flex items-center lg:order-2">
                        {status ? (
                            <div className="relative">
                                <button onClick={toggleDropdown} className="flex items-center">
                                <img src={profileImage} alt="Profile" className="rounded-full h-8 w-8" />
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
                                        <ul>
                                            <li>
                                                <Link to="/history" className="block px-4 py-2">History</Link>
                                            </li>
                                            <li>
                                            <button
                          onClick={() => setShowModal(true)}
                          className="block px-4 py-2">
                          Profile
                        </button>
                          </li>
                                            <li>
                                                <button onClick={handleLogout} className="block px-4 py-2 text-left w-full">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                                <ProfileModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  userData={userData}
                />
                            </div>
                        ) : (
                            <>
                                <Link to="/Login" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Log in</Link>
                                <Link to="/StartMeeting" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Get started Meeting</Link>
                            </>
                        )}
                    </div>
                  <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >

            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
