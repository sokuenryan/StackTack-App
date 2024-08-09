import React from 'react';
// rrd imports

// library imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages and Layouts
import Login from "./pages/Login";
import Bills from "./pages/Bills";
import Investments from "./pages/Investments";
import Credit from "./pages/Credit";
import Register from "./pages/Register";
import Error from "./pages/Error";

import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/Logout";

// Auth Context
import { AuthProvider } from './auth/authContext';
import PrivateRoute from './auth/privateRoute';

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
        element: <PrivateRoute element={Login} />,
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
