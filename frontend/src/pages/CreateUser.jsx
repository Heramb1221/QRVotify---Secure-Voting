import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    age: '',
    gender: '',
    fatherHusbandName: '',
    voterId: '',
    houseNo: '',
    street: '',
    locality: '',
    city: '',
    district: '',
    state: '',
    pinCode: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    aadharNumber: '',
    panCardNumber: '',
    profilePicture: null,
    documents: {
      voterIdCard: null,
      aadharCard: null,
      panCard: null,
    },
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Age Calculation
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      setFormData((prev) => ({ ...prev, age }));
    }
  }, [formData.dob]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateForm();
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
    validateForm();
  };

  const validateForm = () => {
    const validationErrors = {};
    // Basic Validation
    if (!formData.fullName) validationErrors.fullName = 'Full Name is required';
    if (!formData.dob) validationErrors.dob = 'Date of Birth is required';
    if (!formData.age) validationErrors.age = 'Age is required';
    if (!formData.gender) validationErrors.gender = 'Gender is required';
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
      validationErrors.mobile = 'Valid mobile number is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      validationErrors.email = 'Valid email is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword = 'Passwords do not match';
    // File Upload Validation
    if (!formData.documents.voterIdCard) validationErrors.voterIdCard = 'Voter ID Card is required';
    if (!formData.documents.aadharCard) validationErrors.aadharCard = 'Aadhar Card is required';

    setErrors(validationErrors);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    if (password.length < 6) setPasswordStrength('Weak');
    else if (password.length >= 6 && password.length < 10)
      setPasswordStrength('Medium');
    else setPasswordStrength('Strong');
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission process
    console.log('Form Data:', formData);
    setTimeout(() => {
      navigate('/'); // Redirect to the homepage after submission
      setIsSubmitting(false);
    }, 2000); // Simulating a delay before redirecting
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-6 h-2 rounded-lg overflow-hidden bg-gray-300">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${(step / 3) * 100}%`,
            background: 'linear-gradient(to right, blue, white, green)',
          }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4">Personal Details</h2>
            <label className="block mb-2 font-semibold">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full p-2 border rounded mb-4"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

            <label className="block mb-2 font-semibold">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mb-4"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

            <label className="block mb-2 font-semibold">Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              placeholder="Enter your age"
              className="w-full p-2 border rounded mb-4"
              disabled
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

            <label className="block mb-2 font-semibold">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

            <label className="block mb-2 font-semibold">Father’s/Husband’s Name *</label>
            <input
              type="text"
              name="fatherHusbandName"
              value={formData.fatherHusbandName}
              onChange={handleChange}
              required
              placeholder="Enter name"
              className="w-full p-2 border rounded mb-4"
            />
            {errors.fatherHusbandName && <p className="text-red-500 text-sm">{errors.fatherHusbandName}</p>}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4">Address & Identification</h2>
            <label className="block mb-2 font-semibold">Voter ID Number *</label>
            <input
              type="text"
              name="voterId"
              value={formData.voterId}
              onChange={handleChange}
              required
              placeholder="Enter voter ID"
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-semibold">House/Flat Number *</label>
            <input
              type="text"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleChange}
              required
              placeholder="Enter house number"
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-semibold">Street Name *</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              placeholder="Enter street name"
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-semibold">Pin Code *</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              required
              placeholder="Enter pin code"
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-semibold">Aadhar Number *</label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              required
              placeholder="Enter Aadhar number"
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-semibold">Pan Card Number (Optional)</label>
            <input
              type="text"
              name="panCardNumber"
              value={formData.panCardNumber}
              onChange={handleChange}
              placeholder="Enter Pan Card number"
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-semibold">Upload Voter ID Card *</label>
            <input
              type="file"
              name="documents.voterIdCard"
              onChange={handleFileChange}
              required
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-semibold">Upload Aadhar Card *</label>
            <input
              type="file"
              name="documents.aadharCard"
              onChange={handleFileChange}
              required
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-semibold">Upload Pan Card (Optional)</label>
            <input
              type="file"
              name="documents.panCard"
              onChange={handleFileChange}
              className="w-full p-2 border rounded mb-4"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4">Contact & Security</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                placeholder="Enter password"
                className="w-full p-2 border rounded mb-2"
              />
              <p>Password Strength: {passwordStrength}</p>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm password"
                className="w-full p-2 border rounded mb-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <label className="block mb-2 font-semibold">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="w-full p-2 border rounded mb-4"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <label className="block mb-2 font-semibold">Mobile Number *</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              placeholder="Enter mobile number"
              className="w-full p-2 border rounded mb-4"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            className="bg-gray-400 text-white px-6 py-2 rounded-md"
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </button>

          {step === 3 ? (
            <button
              type="submit"
              className={`bg-blue-500 text-white px-6 py-2 rounded-md ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
