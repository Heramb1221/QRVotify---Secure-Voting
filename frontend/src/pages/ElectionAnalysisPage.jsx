import React, { useState, useEffect, useRef } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from "chart.js";
import { debounce } from "lodash";
import autoTable from 'jspdf-autotable';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const ElectionAnalysisPage = () => {
  const [electionData, setElectionData] = useState({
    electionTitle: "National Election 2025",
    totalRegisteredVoters: 1000000,
    totalVotesCast: 700000,
    voterTurnout: 70,
    votesRemaining: 300000,
    voterData: [
      { name: "Voter 1", region: "Region 1", age: 34, gender: "Male", status: "Voted" },
      { name: "Voter 2", region: "Region 1", age: 45, gender: "Female", status: "Voted" },
      { name: "Voter 3", region: "Region 2", age: 28, gender: "Male", status: "Not Voted" },
      { name: "Voter 4", region: "Region 2", age: 60, gender: "Female", status: "Voted" },
    ],
    regions: [
      { name: "Region 1", location: [51.505, -0.09], voters: 100000 },
      { name: "Region 2", location: [51.515, -0.1], voters: 120000 },
      { name: "Region 3", location: [51.525, -0.11], voters: 90000 },
    ]
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredVoters, setFilteredVoters] = useState(electionData.voterData);
  
  // Create refs for chart components
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  const handleSearchChange = debounce((event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    setFilteredVoters(electionData.voterData.filter(voter =>
      voter.name.toLowerCase().includes(query) || 
      voter.region.toLowerCase().includes(query) || 
      voter.status.toLowerCase().includes(query)
    ));
  }, 300);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Updated function to capture chart images
  const captureChartImage = (chartRef) => {
    if (chartRef && chartRef.current) {
      const canvas = chartRef.current.canvas;
      if (canvas) {
        return canvas.toDataURL('image/png');
      }
    }
    return null;
  };

  const generatePDF = async () => {
    setLoading(true);

    try {
      const doc = new jsPDF("p", "mm", "a4");
      
      doc.setFontSize(18);
      doc.text("Election Analysis Report", 10, 10);
      doc.setFontSize(12);
      doc.text(`Election Title: ${electionData.electionTitle}`, 10, 20);
      doc.text(`Total Registered Voters: ${electionData.totalRegisteredVoters.toLocaleString()}`, 10, 30);
      doc.text(`Total Votes Cast: ${electionData.totalVotesCast.toLocaleString()}`, 10, 40);
      doc.text(`Voter Turnout: ${electionData.voterTurnout}%`, 10, 50);
      doc.text(`Votes Remaining: ${electionData.votesRemaining.toLocaleString()}`, 10, 60);

      // Capture and add charts
      let yPosition = 70;
      
      // Add pie chart
      const pieChartImage = captureChartImage(pieChartRef);
      if (pieChartImage) {
        const chartWidth = 150;
        const chartHeight = 80;
        const chartX = (210 - chartWidth) / 2;
        doc.text("Voter Turnout by Region", chartX, yPosition - 5);
        doc.addImage(pieChartImage, "PNG", chartX, yPosition, chartWidth, chartHeight);
        yPosition += chartHeight + 15;
      }
      
      // Add line chart
      const lineChartImage = captureChartImage(lineChartRef);
      if (lineChartImage) {
        const chartWidth = 150;
        const chartHeight = 80;
        const chartX = (210 - chartWidth) / 2;
        doc.text("Votes Over Time", chartX, yPosition - 5);
        doc.addImage(lineChartImage, "PNG", chartX, yPosition, chartWidth, chartHeight);
        yPosition += chartHeight + 15;
      }
      
      // Add bar chart
      const barChartImage = captureChartImage(barChartRef);
      if (barChartImage) {
        const chartWidth = 150;
        const chartHeight = 80;
        const chartX = (210 - chartWidth) / 2;
        doc.text("Votes by Region", chartX, yPosition - 5);
        doc.addImage(barChartImage, "PNG", chartX, yPosition, chartWidth, chartHeight);
      }

      // Add a new page and voters' table
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Voter Data", 10, 10);
      
      const tableColumn = ["Name", "Region", "Age", "Gender", "Status"];
      const tableRows = filteredVoters.map((voter) => [
        voter.name, voter.region, voter.age, voter.gender, voter.status
      ]);
      
      doc.autoTable({
        startY: 20,
        head: [tableColumn],
        body: tableRows,
        theme: "grid",
        headStyles: {
          fillColor: [0, 123, 255],
          textColor: 255,
        },
      });

      // Save the PDF
      doc.save("Election_Analysis_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const voterTurnoutData = {
    labels: ['Region 1', 'Region 2', 'Region 3'],
    datasets: [
      {
        label: 'Voter Turnout (%)',
        data: [65, 80, 72],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00'],
    datasets: [
      {
        label: 'Votes Over Time',
        data: [12, 50, 60, 85, 100, 150],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  const barChartData = {
    labels: ['Region 1', 'Region 2', 'Region 3', 'Region 4'],
    datasets: [
      {
        label: 'Votes by Region',
        data: [50000, 80000, 60000, 40000],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Election Analysis - {electionData.electionTitle}</h1>
        <div className="space-x-4 mt-4 lg:mt-0">
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors" 
            onClick={generatePDF} 
            disabled={loading}
          >
            {loading ? "Generating PDF..." : "Download Report (PDF)"}
          </button>
          <CSVLink
            data={electionData.voterData}
            filename={"election_statistics.csv"}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors inline-block text-center"
          >
            Download Data (CSV)
          </CSVLink>
        </div>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search Voter"
          value={search}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Voter Turnout by Region</h3>
          <Pie ref={pieChartRef} data={voterTurnoutData} />
        </div>
        <div className="border p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Votes Over Time</h3>
          <Line ref={lineChartRef} data={lineChartData} />
        </div>
        <div className="border p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Votes by Region</h3>
          <Bar ref={barChartRef} data={barChartData} />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Voter List</h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Region</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredVoters.map((voter, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="border px-4 py-2">{voter.name}</td>
                  <td className="border px-4 py-2">{voter.region}</td>
                  <td className="border px-4 py-2">{voter.age}</td>
                  <td className="border px-4 py-2">{voter.gender}</td>
                  <td className="border px-4 py-2">{voter.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ElectionAnalysisPage;
