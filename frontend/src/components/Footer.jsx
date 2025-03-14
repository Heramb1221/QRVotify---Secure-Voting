import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  FaFacebookSquare, 
  FaTwitterSquare, 
  FaInstagramSquare, 
  FaYoutubeSquare, 
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaFileAlt,
  FaChartBar,
  FaInfoCircle,
  FaUserFriends
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState(0);
  
  useEffect(() => {
    // In a real implementation, this would be an API call to get the actual count
    // For demonstration, we'll simulate a visitor count
    const storedCount = localStorage.getItem('visitorCount') || 0;
    const newCount = parseInt(storedCount) + 1;
    localStorage.setItem('visitorCount', newCount);
    setVisitorCount(newCount);
  }, []);
  
  return (
    <footer className="bg-[#19567C] text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        {/* Footer Top Section with Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About QRVotify</h3>
            <p className="text-gray-300 mb-4">
              QRVotify is a secure and reliable QR-based voter verification system ensuring transparency in elections. The system is responsible for administering voter verification processes.
            </p>
            <Link to="/about" className="text-yellow-400 hover:text-yellow-300 text-sm">
              Read more
            </Link>
            <div className="flex space-x-3 mt-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                <FaFacebookSquare size={22} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                <FaTwitterSquare size={22} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                <FaInstagramSquare size={22} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                <FaYoutubeSquare size={22} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><NavLink to="/" className="text-gray-300 hover:text-yellow-400">Home</NavLink></li>
              <li><NavLink to="/about" className="text-gray-300 hover:text-yellow-400">About Us</NavLink></li>
              <li><NavLink to="/find-officers" className="text-gray-300 hover:text-yellow-400">Find Officers</NavLink></li>
              <li><NavLink to="/voter-guide" className="text-gray-300 hover:text-yellow-400">Voter Guide</NavLink></li>
              <li><NavLink to="/faq" className="text-gray-300 hover:text-yellow-400">FAQ</NavLink></li>
              <li><NavLink to="/elections-calendar" className="text-gray-300 hover:text-yellow-400">Elections Calendar</NavLink></li>
              <li><NavLink to="/news" className="text-gray-300 hover:text-yellow-400">Election News</NavLink></li>
              <li><NavLink to="/contact" className="text-gray-300 hover:text-yellow-400">Contact</NavLink></li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/help-center" className="text-gray-300 hover:text-yellow-400">Help Center</Link></li>
              <li><Link to="/registration-checklist" className="text-gray-300 hover:text-yellow-400">Registration Checklist</Link></li>
              <li><Link to="/required-documents" className="text-gray-300 hover:text-yellow-400">Required Documents</Link></li>
              <li><Link to="/accessibility" className="text-gray-300 hover:text-yellow-400">Accessibility</Link></li>
              <li><a href="/downloads/voter-handbook.pdf" className="text-gray-300 hover:text-yellow-400">Voter Handbook</a></li>
              <li><Link to="/security" className="text-gray-300 hover:text-yellow-400">Security Information</Link></li>
            </ul>
            
            <h3 className="text-lg font-bold mb-4 mt-6">Updates</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaFileAlt className="mr-2 text-yellow-400" />
                <Link to="/elections" className="text-gray-300 hover:text-yellow-400">
                  Elections Information
                </Link>
              </li>
              <li className="flex items-center">
                <FaChartBar className="mr-2 text-yellow-400" />
                <Link to="/results" className="text-gray-300 hover:text-yellow-400">
                  View Results
                </Link>
              </li>
              <li className="flex items-center">
                <FaInfoCircle className="mr-2 text-yellow-400" />
                <Link to="/reports" className="text-gray-300 hover:text-yellow-400">
                  View Report
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Mobile Apps and Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Mobile Apps</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaMobileAlt className="mr-2 text-yellow-400" />
                <a href="#" className="text-gray-300 hover:text-yellow-400">Voter Helpline App</a>
              </li>
              <li className="flex items-center">
                <FaMobileAlt className="mr-2 text-yellow-400" />
                <a href="#" className="text-gray-300 hover:text-yellow-400">Saksham App</a>
              </li>
              <li className="flex items-center">
                <FaMobileAlt className="mr-2 text-yellow-400" />
                <a href="#" className="text-gray-300 hover:text-yellow-400">cVIGIL App</a>
              </li>
              <li className="flex items-center">
                <FaMobileAlt className="mr-2 text-yellow-400" />
                <a href="#" className="text-gray-300 hover:text-yellow-400">Voter Turnout App</a>
              </li>
            </ul>
            
            <h3 className="text-lg font-bold mb-4 mt-6">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <FaPhone className="mr-2 mt-1 text-yellow-400" />
                <span>1950 (Toll-free Number)<br/>(800) 123-VOTE</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mr-2 mt-1 text-yellow-400" />
                <span>complaints@eci.gov.in<br/>support@qrvotify.gov</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1 text-yellow-400" />
                <span>Election Commission Of India,<br/>Nirvachan Sadan, Ashoka Road,<br/>New Delhi 110001</span>
              </li>
              <li className="flex items-start">
                <FaUserFriends className="mr-2 mt-1 text-yellow-400" />
                <span>Visitor Count: <strong>{visitorCount.toLocaleString()}</strong></span>
              </li>
            </ul>
            <Link to="/about-us" className="inline-block mt-4 bg-yellow-400 text-[#19567C] px-4 py-2 rounded font-medium hover:bg-yellow-300 transition">
              Submit Inquiry
            </Link>
          </div>
        </div>
        
        {/* Horizontal Line */}
        <hr className="border-gray-600 mb-6" />
        
        {/* Bottom Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} QRVotify. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-yellow-400 mb-2 md:mb-0">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-yellow-400 mb-2 md:mb-0">Terms of Service</Link>
            <Link to="/accessibility-statement" className="hover:text-yellow-400 mb-2 md:mb-0">Accessibility</Link>
            <Link to="/sitemap" className="hover:text-yellow-400 mb-2 md:mb-0">Sitemap</Link>
          </div>
        </div>
        
        {/* Official Government Disclaimer */}
        <div className="mt-6 text-xs text-center text-gray-400">
          <p>QRVotify is an official government service. Unauthorized use is prohibited and subject to penalties under law.</p>
          <p className="mt-2">This website is maintained by the Election Commission of India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;