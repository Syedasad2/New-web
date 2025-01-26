// // src/components/User/UserDashboard.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserDashboard = () => {
//   const [loanRequests, setLoanRequests] = useState([]);

//   useEffect(() => {
//     const fetchLoanRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/loans');
//         setLoanRequests(response.data);
//       } catch (error) {
//         console.error('Error fetching loan requests:', error);
//       }
//     };

//     fetchLoanRequests();
//   }, []);

//   return (
//     <div className="user-dashboard">
//       <h2>Your Loan Applications</h2>
//       {loanRequests.length === 0 ? (
//         <p>No loan requests found.</p>
//       ) : (
//         <ul>
//           {loanRequests.map((loan, index) => (
//             <li key={index}>
//               <p>Loan ID: {loan.loanId}</p>
//               <p>Status: {loan.status}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;
