<<<<<<< HEAD
// rrd imports
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// library imports
=======
import { createBrowserRouter, RouterProvider } from "react-router-dom";
>>>>>>> b284e689ec5c2a442a1f879bf2c354672fc1c24b
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/Logout";

import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Bills from "./pages/Bills";
import Investments from "./pages/Investments";
import Credit from "./pages/Credit";
import Error from "./pages/Error";
<<<<<<< HEAD
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
=======
>>>>>>> b284e689ec5c2a442a1f879bf2c354672fc1c24b

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "bills",
        element: <Bills />,
        errorElement: <Error />
      },
      {
        path: "investments",
        element: <Investments />,
        errorElement: <Error />
      },
      {
        path: "credit",
        element: <Credit />,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
