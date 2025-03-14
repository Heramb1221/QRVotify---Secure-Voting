import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiShield, FiCheckCircle } from 'react-icons/fi';
import { MdVerified, MdQrCode2, MdLocationOn, MdSecurity, MdNewspaper } from 'react-icons/md';
import { GrSelection } from 'react-icons/gr';
import { FaUserShield, FaShieldAlt, FaFingerprint, FaLock } from 'react-icons/fa';
import { BsFillQuestionCircleFill, BsCalendarEvent } from 'react-icons/bs';
import homebackground from '../assets/homebackground.png';
import axios from 'axios';

// API service for centralized backend calls
const APIService = {
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  
  getVotingStats: async () => {
    try {
      const response = await axios.get(`${APIService.baseURL}/voting-statistics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching voting statistics:', error);
      throw error;
    }
  },
  
  getTestimonials: async () => {
    try {
      const response = await axios.get(`${APIService.baseURL}/testimonials`);
      return response.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },
  
  getFAQs: async () => {
    try {
      const response = await axios.get(`${APIService.baseURL}/faqs`);
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  },
  
  getUpcomingElections: async () => {
    try {
      const response = await axios.get(`${APIService.baseURL}/upcoming-elections`);
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming elections:', error);
      throw error;
    }
  },
  
  getNews: async () => {
    try {
      const response = await axios.get(`${APIService.baseURL}/news`);
      return response.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }
};

// Component for upcoming election countdown
const ElectionCountdown = ({ election }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(election.date) - new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [election.date]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="font-bold text-lg text-[#19567C] mb-2">{election.name}</h3>
      <p className="text-gray-600 mb-4">{new Date(election.date).toLocaleDateString()}</p>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-gray-100 p-2 rounded">
          <span className="block text-2xl font-bold">{timeLeft.days}</span>
          <span className="text-sm">Days</span>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <span className="block text-2xl font-bold">{timeLeft.hours}</span>
          <span className="text-sm">Hours</span>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <span className="block text-2xl font-bold">{timeLeft.minutes}</span>
          <span className="text-sm">Mins</span>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <span className="block text-2xl font-bold">{timeLeft.seconds}</span>
          <span className="text-sm">Secs</span>
        </div>
      </div>
    </div>
  );
};

// FAQ Accordion Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  
  // State variables
  const [votingStats, setVotingStats] = useState({
    verifiedVoters: 0,
    qrCodesGenerated: 0,
    electionsCompleted: 0
  });
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState({
    stats: true,
    testimonials: true,
    faqs: true,
    elections: true,
    news: true
  });
  const [error, setError] = useState({
    stats: null,
    testimonials: null,
    faqs: null,
    elections: null,
    news: null
  });

  // Sample data for fallback when API is not ready
  const sampleData = {
    testimonials: [
      { id: 1, name: "Jane Smith", role: "First-time Voter", content: "The QR code system made voting so easy! I was verified in seconds." },
      { id: 2, name: "Michael Johnson", role: "Election Officer", content: "This platform has drastically reduced our verification time and increased accuracy." },
      { id: 3, name: "Sarah Williams", role: "Community Leader", content: "QRVotify has increased voter turnout in our district by making the process more accessible." }
    ],
    faqs: [
      { id: 1, question: "How do I get my QR code?", answer: "Register on our platform, find a nearby verification officer, and get your identity verified. Once verified, your QR code will be generated and sent to your registered email." },
      { id: 2, question: "Is my data secure?", answer: "Absolutely! We use end-to-end encryption and blockchain technology to ensure your data is secure and cannot be tampered with." },
      { id: 3, question: "What if I lose my QR code?", answer: "Don't worry! You can log in to your account and generate a replacement QR code. Your old code will be invalidated for security purposes." },
      { id: 4, question: "How do I find a verification officer?", answer: "Use our 'Find Officers' feature to locate verification officers near your location. The system will show you the nearest available officers with their contact details." }
    ],
    upcomingElections: [
      { id: 1, name: "Federal Elections 2025", date: "2025-05-15T00:00:00" },
      { id: 2, name: "Municipal Elections", date: "2025-07-10T00:00:00" }
    ],
    news: [
      { id: 1, title: "QRVotify Reaches 50,000 Verifications", date: "2025-03-01", content: "Our platform has successfully verified 50,000 voters across the country..." },
      { id: 2, title: "New Security Features Added", date: "2025-02-15", content: "We've added enhanced security features to protect voter data..." },
      { id: 3, title: "Mobile App Now Available", date: "2025-01-20", content: "Download our new mobile app for an even easier verification process..." }
    ]
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      // Fetch voting statistics
      try {
        setLoading(prev => ({ ...prev, stats: true }));
        const statsData = await APIService.getVotingStats().catch(() => {
          // Fallback to default values if API not available
          return { verifiedVoters: 12345, qrCodesGenerated: 9876, electionsCompleted: 15 };
        });
        setVotingStats(statsData);
        setError(prev => ({ ...prev, stats: null }));
      } catch (err) {
        setError(prev => ({ ...prev, stats: 'Failed to load statistics' }));
      } finally {
        setLoading(prev => ({ ...prev, stats: false }));
      }
      
      // Fetch testimonials
      try {
        setLoading(prev => ({ ...prev, testimonials: true }));
        const testimonialsData = await APIService.getTestimonials().catch(() => {
          // Fallback to sample data if API not available
          return sampleData.testimonials;
        });
        setTestimonials(testimonialsData);
        setError(prev => ({ ...prev, testimonials: null }));
      } catch (err) {
        setError(prev => ({ ...prev, testimonials: 'Failed to load testimonials' }));
        setTestimonials(sampleData.testimonials);
      } finally {
        setLoading(prev => ({ ...prev, testimonials: false }));
      }
      
      // Fetch FAQs
      try {
        setLoading(prev => ({ ...prev, faqs: true }));
        const faqsData = await APIService.getFAQs().catch(() => {
          // Fallback to sample data if API not available
          return sampleData.faqs;
        });
        setFaqs(faqsData);
        setError(prev => ({ ...prev, faqs: null }));
      } catch (err) {
        setError(prev => ({ ...prev, faqs: 'Failed to load FAQs' }));
        setFaqs(sampleData.faqs);
      } finally {
        setLoading(prev => ({ ...prev, faqs: false }));
      }
      
      // Fetch upcoming elections
      try {
        setLoading(prev => ({ ...prev, elections: true }));
        const electionsData = await APIService.getUpcomingElections().catch(() => {
          // Fallback to sample data if API not available
          return sampleData.upcomingElections;
        });
        setUpcomingElections(electionsData);
        setError(prev => ({ ...prev, elections: null }));
      } catch (err) {
        setError(prev => ({ ...prev, elections: 'Failed to load elections' }));
        setUpcomingElections(sampleData.upcomingElections);
      } finally {
        setLoading(prev => ({ ...prev, elections: false }));
      }
      
      // Fetch news
      try {
        setLoading(prev => ({ ...prev, news: true }));
        const newsData = await APIService.getNews().catch(() => {
          // Fallback to sample data if API not available
          return sampleData.news;
        });
        setNews(newsData);
        setError(prev => ({ ...prev, news: null }));
      } catch (err) {
        setError(prev => ({ ...prev, news: 'Failed to load news' }));
        setNews(sampleData.news);
      } finally {
        setLoading(prev => ({ ...prev, news: false }));
      }
    };

    fetchData();
    
    // Set up auto-refresh interval (every 60 seconds)
    const refreshInterval = setInterval(() => fetchData(), 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  const handleGetStarted = () => {
    navigate('/find-officers');
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#19567C]"></div>
    </div>
  );

  return (
    <div className="bg-slate-50 text-dark min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white px-6 py-10" style={{ backgroundImage: `url(${homebackground})` }}>
        <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg text-center w-full md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">Secure & Reliable QR-Based Voter Verification</h1>
          <p className="text-lg mb-6 text-gray-300">Register today and get your unique QR code for a seamless voting experience.</p>
          <button onClick={handleGetStarted} className="bg-[#ffc107] text-dark px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-[#e0a800] transition">
            Get Started <FiArrowRight className="inline ml-2" />
          </button>
        </div>
      </div>

      {/* Live Voting Section */}
      <div className="bg-slate-50 w-11/12 mx-auto rounded-t-2xl border border-lime-200 mt-10">
        <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Live Voting Statistics</h2>
        <div className="mx-auto py-8 text-center">
          {loading.stats ? (
            <LoadingSpinner />
          ) : error.stats ? (
            <div className="text-red-500 py-6">{error.stats}</div>
          ) : (
            <div className="grid mr-6 ml-6 grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center justify-center">
                <MdVerified className="text-6xl text-[#19567C] mb-4" />
                <h3 className="text-xl font-bold text-[#19567C]">
                  {votingStats.verifiedVoters.toLocaleString()}
                </h3>
                <p className="text-gray-700">Verified Voters</p>
              </div>
              <div className="p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center justify-center">
                <MdQrCode2 className="text-6xl text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-600">
                  {votingStats.qrCodesGenerated.toLocaleString()}
                </h3>
                <p className="text-gray-700">QR Codes Generated</p>
              </div>
              <div className="p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center justify-center">
                <GrSelection className="text-6xl text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-red-500">
                  {votingStats.electionsCompleted}
                </h3>
                <p className="text-gray-700">Elections Conducted</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Upcoming Elections Countdown Section */}
      <div className="w-11/12 mx-auto mt-10">
        <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Upcoming Elections</h2>
        <div className="mx-auto py-8">
          {loading.elections ? (
            <LoadingSpinner />
          ) : error.elections ? (
            <div className="text-red-500 py-6 text-center">{error.elections}</div>
          ) : (
            <div className="grid mr-6 ml-6 grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingElections.slice(0, 2).map(election => (
                <ElectionCountdown key={election.id} election={election} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="w-11/12 mx-auto mt-10">
        <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Why Choose QRVotify?</h2>
        <div className="max-w-6xl mx-auto py-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <MdQrCode2 className="text-5xl text-[#19567C]" />
              </div>
              <h3 className="text-xl font-semibold text-dark">Unique QR Code</h3>
              <p className="text-gray-600">Every voter gets a secure, tamper-proof QR code for authentication.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <MdVerified className="text-5xl text-[#19567C]" />
              </div>
              <h3 className="text-xl font-semibold text-dark">Seamless Verification</h3>
              <p className="text-gray-600">Officials can scan your QR code to verify your identity instantly.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <MdLocationOn className="text-5xl text-[#19567C]" />
              </div>
              <h3 className="text-xl font-semibold text-dark">Find Nearby Officers</h3>
              <p className="text-gray-600">Easily locate verification officers in your area for quick registration.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Features Section */}
      <div className="bg-slate-50 w-11/12 mx-auto rounded-t-2xl border border-lime-200 mt-10">
        <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Security Measures</h2>
        <div className="max-w-6xl mx-auto py-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <FaLock className="text-5xl text-[#19567C]" />
              </div>
              <h3 className="text-xl font-semibold text-dark">End-to-End Encryption</h3>
              <p className="text-gray-600">Your data is encrypted at all times, ensuring complete privacy.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <FaFingerprint className="text-5xl text-[#19567C]" />
              </div>
              <h3 className="text-xl font-semibold text-dark">Biometric Verification</h3>
              <p className="text-gray-600">Multi-layer verification process including biometric checks.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <FaShieldAlt className="text-5xl text-[#19567C]" />
              </div>
              <h3 className="text-xl font-semibold text-dark">Tamper-Proof Records</h3>
              <p className="text-gray-600">Blockchain technology ensures records cannot be altered.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <FaUserShield className="text-5xl text-[#19567C]" />
              </div>
              <h3 className="text-xl font-semibold text-dark">Identity Protection</h3>
              <p className="text-gray-600">Advanced protocols to protect voter identity and prevent fraud.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Workflow Section */}
      <div className="bg-gray-300 w-11/12 mx-auto rounded-t-2xl border border-slate-700 mt-10">
        <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">How It Works</h2>
        <div className="py-16">
          <div className="max-w-6xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="p-6 shadow-md rounded-lg bg-white">
                <h3 className="text-lg font-semibold text-dark">Step 1</h3>
                <p className="text-gray-600">Register on the platform and find a nearby officer.</p>
              </div>
              <div className="p-6 shadow-md rounded-lg bg-white">
                <h3 className="text-lg font-semibold text-dark">Step 2</h3>
                <p className="text-gray-600">Visit the officer to verify your identity and details.</p>
              </div>
              <div className="p-6 shadow-md rounded-lg bg-white">
                <h3 className="text-lg font-semibold text-dark">Step 3</h3>
                <p className="text-gray-600">Receive your unique QR-based voter ID.</p>
              </div>
              <div className="p-6 shadow-md rounded-lg bg-white">
                <h3 className="text-lg font-semibold text-dark">Step 4</h3>
                <p className="text-gray-600">Vote securely with confidence on election day.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="w-11/12 mx-auto mt-10">
        <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">What Our Users Say</h2>
        <div className="mx-auto py-16">
          {loading.testimonials ? (
            <LoadingSpinner />
          ) : error.testimonials ? (
            <div className="text-red-500 py-6 text-center">{error.testimonials}</div>
          ) : (
            <div className="grid mr-6 ml-6 grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="bg-white p-6 shadow-lg rounded-lg">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                  <div className="text-right">
                    <p className="font-semibold text-dark">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-100 w-11/12 mx-auto rounded-t-2xl mt-10">
        <img src="../assets/faq.jpeg" alt="" />
        <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto py-16 px-6">
          {loading.faqs ? (
            <LoadingSpinner />
          ) : error.faqs ? (
            <div className="text-red-500 py-6 text-center">{error.faqs}</div>
          ) : (
            <div>
              {faqs.map(faq => (
                <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Latest News Section */}
      <div className="w-11/12 mx-auto mt-10 mb-10">
        <h2 className="text-2xl font-bold text-white mb-4 bg-[#19567C] text-center py-4 mx-auto rounded-t-2xl">Latest Updates</h2>
        <div className="mx-auto py-16">
          {loading.news ? (
            <LoadingSpinner />
          ) : error.news ? (
            <div className="text-red-500 py-6 text-center">{error.news}</div>
          ) : (
            <div className="grid mr-6 ml-6 grid-cols-1 md:grid-cols-3 gap-6">
              {news.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</p>
                    <h3 className="font-bold text-xl mb-2 text-[#19567C]">{item.title}</h3>
                    <p className="text-gray-700">{item.content.substring(0, 100)}...</p>
                    <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">Read More</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 bg-gray-200">
        <h2 className="text-2xl font-bold text-dark mb-4">Get Ready for a Secure Voting Experience!</h2>
        <button onClick={handleGetStarted} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;