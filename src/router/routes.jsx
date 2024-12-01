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
import Leave from "../features/employee/pages/Leave";
import Home from "../features/employee/pages/Home";
import LeaveTypes from "../features/manager/pages/LeaveTypes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/manager/auth",
    element: <ManagerAuth />,

  },
  {
    path: "/auth",
    element: <EmployeeAuth />,
  },

  // Employe
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/leave",
    element: <Leave />,
  },


  // Admin
  {
    path: "/manager",
    element: <ManagerLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "employees",
        element: <EmployeeManagement />
      },
      {
        path: "leaves",
        element: <LeaveManagement />
      },
      {
        path: "leave/types",
        element: <LeaveTypes />
      }
    ]
  },

  {path : '*', element :  <NotFound/>}
]);

export default routes;
