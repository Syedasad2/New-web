import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom"
import HomePage from "./pages/HomePage"
import UserSignup from "./components/User/UserSignup"
import UserLogin from "./components/User/UserLogin"
import AdminLogin from "./components/Admin/AdminSignIn"
import AdminSignUp from "./components/Admin/AdminSignUp"
import AdminDashboard from "./components/Admin/AdminDashboard"
import LoanRequestForm from "./components/User/LoanRequestForm"
import LoanDetails from "./components/User/LoanDetails"
import UserDashboard from "./components/User/UserDashboard"
import Navbar from "./Components/Navbar"

const isAuthenticated = () => {
  return localStorage.getItem("user") ? true : false
}

const isAdmin = () => {
  const user = localStorage.getItem("user")
  if (!user) return false
  try {
    const parsedUser = JSON.parse(user)
    return parsedUser && parsedUser.isAdmin === true
  } catch (error) {
    console.error("Error parsing user data:", error)
    return false
  }
}

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />
  }
  return children
}

const AdminProtectedRoute = ({ children }) => {
  if (!isAdmin()) {
    return <Navigate to="/admin/signin" replace />
  }
  return children
}

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <UserSignup /> },
      { path: "signin", element: <UserLogin /> },
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
    path: "admin",
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
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App

