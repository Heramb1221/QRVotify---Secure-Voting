import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const AboutUs = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    setFeedback('');
  };

  const handleGetStartedClick = () => {
    navigate('/find-officers'); // Redirect to the "Find Officer" page
  };

  return (
    <div className="bg-gray-50 text-dark">
      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* Organization Overview */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">About QRVotify</h1>
          <p className="text-lg text-gray-700">
            QRVotify is a secure and reliable QR-based voter verification system designed to ensure transparency and fairness in elections.
            Our mission is to simplify voter registration and verification, making the process accessible and secure for everyone.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Founded with a vision to revolutionize the voting process, QRVotify has grown into a trusted platform that
            combines cutting-edge technology with government protocols for a transparent electoral process.
          </p>
        </section>

        {/* Company Values & Vision */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">Our Values & Vision</h2>
          <p className="text-lg text-gray-700">
            We believe in transparency, security, and ease of access. Our vision is to transform the electoral process by providing cutting-edge solutions that ensure the integrity of elections for a better future.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[{ name: 'John Doe', role: 'CEO', img: 'https://via.placeholder.com/150' },
              { name: 'Jane Smith', role: 'CTO', img: 'https://via.placeholder.com/150' },
              { name: 'Alice Johnson', role: 'Lead Developer', img: 'https://via.placeholder.com/150' }]
              .map((member, index) => (
                <div key={index} className="text-center p-4 border rounded-lg shadow-md bg-white">
                  <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">We Value Your Feedback</h2>
          {!submitted ? (
            <form onSubmit={handleFeedbackSubmit} className="max-w-lg mx-auto">
              <textarea
                name="feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Share your thoughts, suggestions, or concerns..."
                className="w-full p-4 border rounded-lg mb-4"
                required
                rows={4}
              ></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                Submit Feedback
              </button>
            </form>
          ) : (
            <p className="text-center text-green-600 font-semibold">Thank you for your feedback!</p>
          )}
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-blue-600 text-white">
          <h2 className="text-3xl font-bold mb-4">Join Us in Making Elections Safer</h2>
          <p className="text-lg mb-6">Get involved today by signing up or learning more about how QRVotify is transforming elections.</p>
          <button
            onClick={handleGetStartedClick}
            className="bg-white text-blue-600 py-2 px-6 rounded-lg shadow-md"
          >
            Get Started
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
