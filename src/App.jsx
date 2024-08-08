<<<<<<< HEAD
import React from 'react';
=======
<<<<<<< HEAD
// rrd imports
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// library imports
=======
>>>>>>> ee8df5ade3b9ce38051e6a90c7239924c13bd9af
import { createBrowserRouter, RouterProvider } from "react-router-dom";
>>>>>>> b284e689ec5c2a442a1f879bf2c354672fc1c24b
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages and Layouts
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Bills from "./pages/Bills";
import Investments from "./pages/Investments";
import Credit from "./pages/Credit";
import Register from "./pages/Register";
import Error from "./pages/Error";
<<<<<<< HEAD
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/Logout";
=======
<<<<<<< HEAD
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
=======
>>>>>>> b284e689ec5c2a442a1f879bf2c354672fc1c24b
>>>>>>> ee8df5ade3b9ce38051e6a90c7239924c13bd9af

// Auth Context
import { AuthProvider } from './authContext';
import PrivateRoute from './privateRoute';

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <PrivateRoute element={Dashboard} />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "bills",
        element: <PrivateRoute element={Bills} />,
        errorElement: <Error />
      },
      {
        path: "investments",
        element: <PrivateRoute element={Investments} />,
        errorElement: <Error />
      },
      {
        path: "credit",
        element: <PrivateRoute element={Credit } />,
        errorElement: <Error />
      },
      {
        path: "register",
        element: <Register />,
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
    <AuthProvider>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
