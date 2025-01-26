import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoanRequests = async () => {
      try {
        const response = await axios.get('https://my-web-production-10ef.up.railway.app/loan');
        setLoanRequests(response.data);
      } catch (error) {
        console.error('Error fetching loan requests:', error);
      }
    };

    fetchLoanRequests();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Loan Applications</h2>

        {loanRequests.length === 0 ? (
          <p className="text-center text-gray-600">You haven't made any loan requests yet.</p>
        ) : (
          <ul className="space-y-6">
            {loanRequests.map((loan, index) => (
              <li
                key={index}
                className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Loan ID: {loan.loanId}</p>
                    <p className="text-sm text-gray-500">Status: {loan.status}</p>
                  </div>
                  <button
                    className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onClick={() => navigate(`/loan-details/${loan.loanId}`)} // Navigate to loan details
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/loan-request')} // Navigate to loan request form
            className="px-6 py-3 bg-teal-600 text-black rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          >
            Request a New Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
