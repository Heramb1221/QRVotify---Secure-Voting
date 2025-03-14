import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import FindOfficerPage from './pages/FindOfficer';
import AboutUs from './pages/Aboutus';
import CreateUser from './pages/CreateUser';
import UserProfile from './pages/UserProfile';
import ScanQRPage from './pages/ScanQRPage';
import ElectionAnalysisPage from './pages/ElectionAnalysisPage';
import PollingStationsPage from './pages/PollingStationsPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-officers" element={<FindOfficerPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/scan-qr" element={<ScanQRPage />} />
        <Route path="/analysis" element={<ElectionAnalysisPage />} />
        <Route path="/polls" element={<PollingStationsPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
