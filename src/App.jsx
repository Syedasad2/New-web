import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./pages/Home";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100 w-screen">
        <Routes>
          <Route path="/HOme" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
