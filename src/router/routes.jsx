import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ManagerAuth from "../features/auth/pages/ManagerAuth";
import EmployeeAuth from "../features/auth/pages/EmployeeAuth";
import NotFound from "../pages/NotFound";

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
  {path : '*', element :  <NotFound/>}
]);

export default routes;
