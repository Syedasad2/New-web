import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./pages/Home";
import AdminSignIn from "./Components/AdminSignIn";
import AdminSignUp from "./Components/AdminSignUp";
import UserSignIn from "./Components/SignIn";
import UserSignUp from "./Components/SignUp";

// Optional 404 Page
import NotFound from "./pages/NotFound";
// nwe chan
function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar globally show hoga har page pe */}
      <div className="min-h-screen bg-gray-100 w-screen p-4">
        <Routes>
          {/* Root path for HomePage */}
          <Route path="/" element={<HomePage />} />

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
