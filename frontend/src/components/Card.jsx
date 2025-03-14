import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ECI from '../assets/ECI.png';
import IF from '../assets/IndianFlag.jpg';
import Us from '../assets/User.jpg'; // Fallback image for user photo

const Card = ({ user }) => {
  const cardRef = useRef(); // Reference to the card for PDF export

  const handleDownloadPDF = () => {
    const cardElement = cardRef.current;
    html2canvas(cardElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // A4 width minus margin
      const pdfHeight = pdf.internal.pageSize.getHeight() - 20; // A4 height minus margin

      const cardWidth = canvas.width;
      const cardHeight = canvas.height;

      // Calculate the scaling factor to fit the card within the A4 size
      const scaleFactor = Math.min(pdfWidth / cardWidth, pdfHeight / cardHeight);

      // Calculate new dimensions based on the scaling factor
      const newWidth = cardWidth * scaleFactor;
      const newHeight = cardHeight * scaleFactor;

      // Position the image in the PDF with padding
      pdf.addImage(imgData, "PNG", 10, 10, newWidth, newHeight);

      // Save the PDF with the user's name
      pdf.save(`Voter_ID_Card_${user.fullName}.pdf`);
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Voter ID Card */}
      <div
        ref={cardRef}
        className="w-[450px] h-[650px] p-6 rounded-lg shadow-xl border-4 border-gray-400 bg-gradient-to-b from-gray-100 to-green-100 relative"
      >
        {/* Header - Election Commission */}
        <div className="flex justify-between items-center border-b-2 border-gray-500 pb-2 mb-2">
          <img src={ECI} alt="ECI Logo" className="h-12" />
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-800">
              आपका निर्वाचन आयोग <br />
              Election Commission of Yours
            </h2>
            <p className="text-sm text-gray-600">मतदाता फोटो पहचान पत्र</p>
          </div>
          <img src={IF} alt="India Flag" className="h-12" />
        </div>

        {/* User Image */}
        <div className="flex justify-center">
          <img
            src={user.photo ? user.photo : Us} // Use user photo if available, otherwise fallback to Us image
            alt="User"
            className="w-32 h-32 rounded-lg border-4 border-gray-500"
          />
        </div>

        {/* User Details */}
        <div className="mt-4 text-md text-gray-800">
          <p>
            <strong>निर्वाचक का नाम (Elector's Name):</strong>{" "}
            {user.fullName}
          </p>
          <p>
            <strong>पिता / पति का नाम (Father/Husband's Name):</strong>{" "}
            {user.fatherHusbandName}
          </p>
          <p>
            <strong>लिंग (Sex):</strong> {user.gender}
          </p>
          <p>
            <strong>जन्म तिथि (Date of Birth):</strong> {user.dob}
          </p>
          <p>
            <strong>मतदाता पहचान संख्या (Voter ID):</strong> {user.voterId}
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mt-6">
          <QRCode value={user.voterId} size={100} />
        </div>

        {/* Barcode */}
        <div className="flex justify-center mt-3">
          <div className="w-64 h-8 bg-gray-400"></div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 text-sm text-gray-700 text-center w-full">
          <p>निर्वाचन आयोग द्वारा प्रमाणित (Certified by Election Commission)</p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadPDF}
        className="mt-6 px-5 py-3 bg-blue-700 text-white font-bold rounded-lg shadow-md"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default Card;
