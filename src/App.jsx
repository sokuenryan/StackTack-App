import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages 
import Login from "./pages/Login";
import Bills from "./pages/Bills";
import Investments from "./pages/Investments";
import Credit from "./pages/Credit";
import Error from "./pages/Error";
import Nav from "./components/Nav"; 

// Auth
import { AuthProvider } from './auth/authContext';
import PrivateRoute from './auth/privateRoute';
import Register from './pages/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Login />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: "register",
    element: (
      <>
        <Nav />
        <Register />
      </>
    ),
    errorElement: <Error />
  },
  {
    path: "bills",
    element: (
      <>
        <Nav />
        <PrivateRoute element={Bills} />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: "investments",
    element: (
      <>
        <Nav />
        <PrivateRoute element={Investments} />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: "credit",
    element: (
      <>
        <Nav />
        <PrivateRoute element={Credit} />
      </>
    ),
    errorElement: <Error />,
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
