import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./pages/Home";
import AdminSignIn from "./Components/Admin Auth/AdminSignIn";  // Import AdminSignIn
import AdminSignUp from "./Components/Admin Auth/AdminSignUp";  // Import AdminSignUp
import UserSignIn from "./Components/UserAuth/SignIn";    // Import UserSignIn
import UserSignUp from "./Components/UserAuth/SignUp";    // Import UserSignUp

// Optional 404 Page
import NotFound from "./pages/NotFound";  // Create a NotFound page for undefined routes

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100 w-screen p-4">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />

          {/* User Routes */}
          <Route path="/user/signin" element={<UserSignIn />} />
          <Route path="/user/signup" element={<UserSignUp />} />

          {/* Fallback route for 404 pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
