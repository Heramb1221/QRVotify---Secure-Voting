import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const PollingStationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const stations = [
    { id: '1', name: 'Station 1', location: '123 Main St, City A', registeredVoters: 1200, votesCast: 850 },
    { id: '2', name: 'Station 2', location: '456 Elm St, City B', registeredVoters: 1100, votesCast: 600 },
    { id: '3', name: 'Station 3', location: '789 Oak St, City C', registeredVoters: 1500, votesCast: 1300 },
  ];

  const filteredStations = stations.filter(
    (station) => station.name.toLowerCase().includes(searchTerm.toLowerCase()) || station.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStations.length / rowsPerPage);
  const paginatedStations = filteredStations.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Polling Stations</h1>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-500"
        />

        <CSVLink data={stations} filename="polling_stations.csv">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Export to CSV
          </button>
        </CSVLink>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-gray-100 shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 border-b text-left">Name</th>
              <th className="px-4 py-3 border-b text-left">Location</th>
              <th className="px-4 py-3 border-b text-left">Registered Voters</th>
              <th className="px-4 py-3 border-b text-left">Votes Cast</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStations.length === 0 ? (
              <tr><td colSpan="4" className="p-4 text-center text-gray-500">No data available</td></tr>
            ) : (
              paginatedStations.map(station => (
                <tr key={station.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b text-gray-700">{station.name}</td>
                  <td className="px-4 py-3 border-b text-gray-700">{station.location}</td>
                  <td className="px-4 py-3 border-b text-gray-700">{station.registeredVoters}</td>
                  <td className="px-4 py-3 border-b text-gray-700">{station.votesCast}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-700">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 disabled:opacity-50">
            Previous
          </button>
          <span className="mx-4 text-lg">Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollingStationsPage;
