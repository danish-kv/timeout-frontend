import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ManagerAuth from "../features/auth/pages/ManagerAuth";
import EmployeeAuth from "../features/auth/pages/EmployeeAuth";
import NotFound from "../pages/NotFound";
import Dashboard from "../features/manager/pages/Dashboard";
import EmployeeManagement from "../features/manager/pages/EmployeeManagement";
import LeaveManagement from "../features/manager/pages/LeaveManagement";
import ManagerLayout from "../features/manager/layout/ManagerLayout";
import Profile from "../features/employee/pages/Profile";
import Home from "../features/employee/pages/Home";
import LeaveTypes from "../features/manager/pages/LeaveTypes";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "./protected/ProtectedRoute";
import AuthProtection from "./protected/AuthProtection";
import LandingPageProtection from "./protected/LandingPageProtection";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageProtection element={<LandingPage />}/>,
  },
  {
    path: "/manager/auth",
    element: (
      <AuthProtection element={<ManagerAuth />} redirectTo={"/manager"} />
    ),
  },
  {
    path: "/auth",
    element: <AuthProtection element={<EmployeeAuth />} redirectTo={"/home"} />,
  },

  // Employe
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} role={"employee"} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute element={<Profile />} role={"employee"} />,
  },

  // Admin
  {
    path: "/manager",
    element: <ManagerLayout />,
    children: [
      {
        index : true,
        element: <ProtectedRoute element={<Dashboard />} role={"manager"} />,
      },
      {
        path: "employees",
        element: (
          <ProtectedRoute element={<EmployeeManagement />} role={"manager"} />
        ),
      },
      {
        path: "leaves",
        element: (
          <ProtectedRoute element={<LeaveManagement />} role={"manager"} />
        ),
      },
      {
        path: "leave-types",
        element: <ProtectedRoute element={<LeaveTypes />} role={"manager"} />,
      },
    ],
  },

  { path: "*", element: <NotFound /> },
  { path: "unauthorized", element: <Unauthorized /> },
]);

export default routes;
