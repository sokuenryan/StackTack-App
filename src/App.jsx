import React from 'react';
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/Logout";

// library 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages 
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bills from "./pages/Bills";
import Investments from "./pages/Investments";
import Credit from "./pages/Credit";
import Error from "./pages/Error";

// Auth
import { AuthProvider } from './auth/authContext';
import PrivateRoute from './auth/privateRoute';

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
        path: "register",
        element: <PrivateRoute element={Register} />,
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
