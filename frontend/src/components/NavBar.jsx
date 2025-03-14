import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { 
  FiLogIn, 
  FiUserPlus, 
  FiLogOut, 
  FiUser, 
  FiDatabase, 
  FiUsers,
  FiQrCode,
  FiCreditCard,
  FiBell,
  FiMenu,
  FiX,
  FiSettings,
  FiHelpCircle,
  FiCircle
} from "react-icons/fi";
import { FaQrcode } from "react-icons/fa";
import logo from '../assets/mainlogo.png';
import homeIcon from '../assets/home.png';

const NavBar = () => {
  const [userType, setUserType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isElectionActive, setIsElectionActive] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
        
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserType(data.user.userType);
          setUserName(data.user.name);
          setIsLoggedIn(true);
          fetchNotifications();
        } else {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      }
    };

    const checkElectionStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/election/status');
        if (response.ok) {
          const data = await response.json();
          setIsElectionActive(data.isActive);
        }
      } catch (error) {
        console.error('Error checking election status:', error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const response = await fetch('http://localhost:5000/api/notifications/unread', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setNotificationCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    checkAuthStatus();
    checkElectionStatus();
    
    const electionStatusInterval = setInterval(checkElectionStatus, 60000);
    
    return () => {
      clearInterval(electionStatusInterval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserType('');
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className='bg-[#1a73e8] p-2 w-full shadow-md'>
      <nav className='flex justify-between items-center h-20 max-w-6xl mx-auto'>
        <NavLink to='/' className="flex items-center ml-5 cursor-pointer">
          <img src={logo} alt="Logo" width={50} height={50} className="mr-2"/>
          <h1 className='text-xl font-bold text-white'>QRVotify</h1>
        </NavLink>
        
        {/* Election Status Indicator */}
        {isElectionActive && (
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <FiCircle className="animate-pulse mr-1" size={8} />
            Election Active
          </div>
        )}

        {/* Mobile menu button */}
        <div className="md:hidden mr-5">
          <button 
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-4 mr-5'>
          {/* Home link - visible to all users */}
          <NavLink to='/' className="flex items-center space-x-1 text-white hover:text-gray-300 transition">
            <img src={homeIcon} alt="Home" width={18} height={18}/>
            <p className='text-base font-medium'>Home</p>
          </NavLink>

          {/* Authentication buttons */}
          {!isLoggedIn ? (
            <NavLink to='/login'>
              <button className="flex h-[38px] w-[102px] items-center gap-x-2 px-4 py-2 bg-[#f8f9fa] text-[#212529] font-semibold border border-[#f8f9fa] rounded-lg shadow-md hover:bg-gray-200 transition">
                Login
                <FiLogIn />
              </button>
            </NavLink>
          ) : (
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <NavLink to="/notifications" className="relative text-white hover:text-gray-300">
                <FiBell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </NavLink>

              {/* User profile dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleProfileDropdown}
                  className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                >
                  <FiUser className="mr-1" />
                  <span className="font-medium max-w-[100px] truncate">{userName}</span>
                </button>
                
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </NavLink>
                    {userType === 'voter' && (
                      <NavLink to="/voter/card" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Voter Card
                      </NavLink>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* "About Us" button */}
          <NavLink to='/about-us' className="flex items-center space-x-1 text-white hover:text-gray-300 transition">
            <FiHelpCircle size={18} />
            <p className='text-base font-medium'>About Us</p>
          </NavLink>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 right-0 bg-white shadow-lg p-4 md:hidden">
            {/* Repeat the navigation links similar to the desktop version */}
            <NavLink to='/about-us' className="block text-gray-700 py-2">About Us</NavLink>
            <div className="mt-4 flex justify-between items-center">
              {/* Authentication buttons */}
              {!isLoggedIn ? (
                <NavLink to='/login'>
                  <button className="flex items-center gap-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg">
                    Login <FiLogIn />
                  </button>
                </NavLink>
              ) : (
                <button onClick={handleLogout} className="flex items-center gap-x-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg">
                  Logout <FiLogOut />
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
