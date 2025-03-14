import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { FiUser, FiLock, FiSmartphone, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('voterId');
  const [formData, setFormData] = useState({
    voterId: '',
    password: '',
    mobile: '',
    otp: '',
    captchaVerified: false,
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    } else if (otpSent && otpTimer === 0) {
      setOtpSent(false);
    }
    return () => clearInterval(interval);
  }, [otpTimer, otpSent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCaptcha = (value) => {
    setFormData(prev => ({ ...prev, captchaVerified: !!value }));
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: null }));
    }
  };

  const handleOtpRequest = () => {
    if (!formData.mobile) {
      setErrors(prev => ({ ...prev, mobile: 'Mobile number is required' }));
      return;
    }
    setOtpSent(true);
    setOtpTimer(60);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Voter Login</h2>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
            <FiAlertCircle className="mr-2" />
            <span>{errors.general}</span>
          </div>
        )}

        <div className="flex w-full mb-4">
          <button
            onClick={() => setLoginMethod('voterId')}
            className={`flex-1 py-2 text-sm font-medium border rounded-l-lg transition-all ${loginMethod === 'voterId' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Voter ID
          </button>
          <button
            onClick={() => setLoginMethod('mobile')}
            className={`flex-1 py-2 text-sm font-medium border rounded-r-lg transition-all ${loginMethod === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Mobile OTP
          </button>
        </div>

        <form className="space-y-4">
          {loginMethod === 'voterId' ? (
            <>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-500" />
                <input type="text" name="voterId" placeholder="Enter Voter ID" className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-500" />
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter Password" className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <FiSmartphone className="absolute left-3 top-3 text-gray-500" />
                <input type="tel" name="mobile" placeholder="Enter Mobile Number" className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>
              <button type="button" onClick={handleOtpRequest} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {otpSent ? `Resend OTP in ${otpTimer}s` : "Get OTP"}
              </button>
              {otpSent && <input type="text" name="otp" placeholder="Enter OTP" className="w-full p-2 border rounded mt-2 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />}
            </>
          )}

          {/* Hardcoded Site Key */}
          <ReCAPTCHA sitekey="6LcBIvQqAAAAAFEUBmPlWHp5qbObCUsyKlnbVCut" onChange={handleCaptcha} />

          <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
