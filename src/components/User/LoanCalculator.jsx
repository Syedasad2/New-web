import React, { useState } from "react";

const LoanCalculator = () => {
  const [loanData, setLoanData] = useState({
    category: "",
    subcategory: "",
    initialDeposit: "",
    loanPeriod: "",
    estimatedLoan: 0,
  });

  const handleChange = (e) => {
    setLoanData({
      ...loanData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = () => {
    // Simple logic to calculate loan estimation, you can modify this as required
    const estimatedLoan = loanData.initialDeposit
      ? loanData.initialDeposit * 1.2
      : 0;
    setLoanData({
      ...loanData,
      estimatedLoan,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Loan Calculator
        </h2>
        <form className="space-y-4">
          {/* Loan Category */}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Select Loan Category
            </label>
            <select
              name="category"
              value={loanData.category}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Loan Category</option>
              <option value="wedding">Wedding</option>
              <option value="home">Home Construction</option>
              <option value="business">Business Startup</option>
              <option value="education">Education</option>
            </select>
          </div>

          {/* Loan Subcategory */}
          <div className="flex flex-col">
            <label
              htmlFor="subcategory"
              className="text-sm font-medium text-gray-700"
            >
              Select Subcategory
            </label>
            <select
              name="subcategory"
              value={loanData.subcategory}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Subcategory</option>
              {/* You can dynamically add subcategories based on the selected category */}
            </select>
          </div>

          {/* Initial Deposit */}
          <div className="flex flex-col">
            <label
              htmlFor="initialDeposit"
              className="text-sm font-medium text-gray-700"
            >
              Initial Deposit
            </label>
            <input
              type="number"
              name="initialDeposit"
              value={loanData.initialDeposit}
              onChange={handleChange}
              placeholder="Enter Initial Deposit"
              className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Loan Period */}
          <div className="flex flex-col">
            <label
              htmlFor="loanPeriod"
              className="text-sm font-medium text-gray-700"
            >
              Loan Period (in years)
            </label>
            <input
              type="number"
              name="loanPeriod"
              value={loanData.loanPeriod}
              onChange={handleChange}
              placeholder="Enter Loan Period"
              className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Calculate Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate Loan
            </button>
          </div>
        </form>

        {/* Estimated Loan Breakdown */}
        {loanData.estimatedLoan > 0 && (
          <div className="mt-6 bg-blue-50 p-4 rounded-md">
            <h3 className="text-xl font-semibold text-blue-600">
              Estimated Loan Breakdown
            </h3>
            <p className="mt-2 text-gray-700">
              Estimated Loan: <strong>{loanData.estimatedLoan}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
