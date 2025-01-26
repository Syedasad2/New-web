import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loan requests and users after the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch loan requests
        const loanResponse = await axios.get(
          "https://my-web-production-10ef.up.railway.app/loans",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is sent in the header
            },
          }
        );
        setLoanRequests(loanResponse.data);

        // Fetch users
        const userResponse = await axios.get(
          "https://my-web-production-10ef.up.railway.app/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is sent in the header
            },
          }
        );
        setUsers(userResponse.data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show loading message while fetching
  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl space-y-8">
        {/* Dashboard Header */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h2>

        {/* Error message */}
        {error && (
          <div className="text-center text-red-600 mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Loan Requests Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-700">Loan Requests</h3>
          {loanRequests.length === 0 ? (
            <p className="text-center text-gray-500">No loan requests found.</p>
          ) : (
            <ul className="space-y-4">
              {loanRequests.map((loan) => (
                <li
                  key={loan.loanId} // Assuming `loanId` is a unique identifier for each loan
                  className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        Loan ID: {loan.loanId}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: {loan.status}
                      </p>
                    </div>
                    <button
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() =>
                        alert(`More details for Loan ID: ${loan.loanId}`)
                      }
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Users Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-700">Users</h3>
          {users.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : (
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id} // Assuming `id` is a unique identifier for each user
                  className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Email: {user.email}
                      </p>
                    </div>
                    <button
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() =>
                        alert(`View more details for ${user.name}`)
                      }
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
