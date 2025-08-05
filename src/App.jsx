import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserSignup from "./components/User/UserSignup";
import UserLogin from "./components/User/UserLogin";
import AdminLogin from "./components/Admin/AdminSignIn";
import AdminSignUp from "./components/Admin/AdminSignUp";
import AdminDashboard from "./components/Admin/AdminDashboard";
import LoanRequestForm from "./components/User/LoanRequestForm";
import About from "./pages/About";
// import Contact from "./pages/Contact"; // ✅ FIX: renamed `about` to `About`
 // ✅ FIX: renamed `about` to `About`
import LoanDetails from "./components/User/LoanDetails";
import UserDashboard from "./components/User/UserDashboard";
import Navbar from "./components/Navbar"; // ✅ FIX: folder name casing consistency
import Contact from "./pages/Contact";

// ✅ Auth check
const isAuthenticated = () => {
  return localStorage.getItem("user") ? true : false;
};

// ✅ Admin role check
const isAdmin = () => {
  const user = localStorage.getItem("user");
  if (!user) return false;
  try {
    const parsedUser = JSON.parse(user);
    return parsedUser && parsedUser.isAdmin === true;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return false;
  }
};

// ✅ Protected route for logged-in users
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

// ✅ Protected route for admins
const AdminProtectedRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/admin/signin" replace />;
};

// ✅ Layout with Navbar
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

// ✅ Router definition
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <UserSignup /> },
      { path: "signin", element: <UserLogin /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> }, // ✅ Added About page route
       // ✅ Added About page route
      {
        path: "loan-request",
        element: (
          <ProtectedRoute>
            <LoanRequestForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "loan-details/:loanId",
        element: (
          <ProtectedRoute>
            <LoanDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <Layout />, // ✅ Add layout to admin section too
    children: [
      { path: "signin", element: <AdminLogin /> },
      { path: "signup", element: <AdminSignUp /> },
      {
        path: "dashboard",
        element: (
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        ),
      },
    ],
  },
]);

// ✅ Main App
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
