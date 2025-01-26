import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const LoanRequestForm = () => {
  const [loanRequest, setLoanRequest] = useState({
    loanAmount: '',
    loanPeriod: '',
    loanCategory: '',
    loanSubCategory: '',
    interestRate: '',
    userId: '679527704787e72e3f90f0fb', // Assuming this is hardcoded for now, you can fetch from localStorage
  });

  const navigate = useNavigate(); // Initialize navigate for routing

  const handleChange = (e) => {
    setLoanRequest({
      ...loanRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (
      !loanRequest.loanAmount ||
      !loanRequest.loanPeriod ||
      !loanRequest.loanCategory ||
      !loanRequest.loanSubCategory ||
      !loanRequest.interestRate
    ) {
      alert('Please fill in all the fields!');
      return;
    }

    // Log the request data to inspect before submitting
    console.log('Loan Request Data:', loanRequest);

    try {
      const response = await axios.post('https://my-web-production-10ef.up.railway.app/loan/create', loanRequest, {
        headers: {
          'Content-Type': 'application/json', // Ensure correct content type
        },
      });

      // If successful, show a success message and log the response
      alert('Loan request submitted successfully!');
      console.log(response.data);

      // Redirect to the User Dashboard
      navigate('/dashboard'); // Redirect to the dashboard route
    } catch (error) {
      console.error('Error submitting loan request:', error);
      
      // If the error response has a response object, log the details
      if (error.response) {
        console.log('Response Error:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Please check your input and try again'}`);
      } else {
        // Network error or no response
        alert('Error while submitting loan request! Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Loan Request Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Loan Amount */}
          <div className="flex flex-col">
            <label htmlFor="loanAmount" className="text-sm font-medium text-gray-700">Loan Amount</label>
            <input
              type="number"
              name="loanAmount"
              value={loanRequest.loanAmount}
              onChange={handleChange}
              placeholder="Enter Loan Amount"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Loan Period */}
          <div className="flex flex-col">
            <label htmlFor="loanPeriod" className="text-sm font-medium text-gray-700">Loan Period (in months)</label>
            <input
              type="number"
              name="loanPeriod"
              value={loanRequest.loanPeriod}
              onChange={handleChange}
              placeholder="Enter Loan Period"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Loan Category */}
          <div className="flex flex-col">
            <label htmlFor="loanCategory" className="text-sm font-medium text-gray-700">Loan Category</label>
            <select
              name="loanCategory"
              value={loanRequest.loanCategory}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select Loan Category</option>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Home">Home</option>
            </select>
          </div>

          {/* Loan Subcategory */}
          <div className="flex flex-col">
            <label htmlFor="loanSubCategory" className="text-sm font-medium text-gray-700">Loan Subcategory</label>
            <select
              name="loanSubCategory"
              value={loanRequest.loanSubCategory}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select Loan Subcategory</option>
              <option value="Short-term">Short-term</option>
              <option value="Long-term">Long-term</option>
            </select>
          </div>

          {/* Interest Rate */}
          <div className="flex flex-col">
            <label htmlFor="interestRate" className="text-sm font-medium text-gray-700">Interest Rate (%)</label>
            <input
              type="number"
              name="interestRate"
              value={loanRequest.interestRate}
              onChange={handleChange}
              placeholder="Enter Interest Rate"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Submit Loan Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanRequestForm;
