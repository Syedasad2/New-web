import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const LoanDetails = () => {
  const { loanId } = useParams(); // Get the loanId from the URL
  const [loanDetail, setLoanDetail] = useState(null);

  useEffect(() => {
    const fetchLoanDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4003/loan/${loanId}`
        );
        setLoanDetail(response.data);
      } catch (error) {
        console.error("Error fetching loan details:", error);
      }
    };

    fetchLoanDetail();
  }, [loanId]);

  if (!loanDetail) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Loan Details
        </h2>

        <div className="space-y-6">
          <p>
            <strong>Loan ID:</strong> {loanDetail.loanId}
          </p>
          <p>
            <strong>Loan Amount:</strong> ${loanDetail.loanAmount}
          </p>
          <p>
            <strong>Loan Period:</strong> {loanDetail.loanPeriod} months
          </p>
          <p>
            <strong>Loan Category:</strong> {loanDetail.loanCategory}
          </p>
          <p>
            <strong>Loan Subcategory:</strong> {loanDetail.loanSubCategory}
          </p>
          <p>
            <strong>Interest Rate:</strong> {loanDetail.interestRate}%
          </p>
          <p>
            <strong>Status:</strong> {loanDetail.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
