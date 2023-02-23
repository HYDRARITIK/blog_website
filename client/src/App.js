import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import "./styles.scss";


import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{position: "relative", overflow:"hidden",minHeight:"100vh"}}>
      <Navbar />
      
      <div style={{marginBottom: "100px"}}>

      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Home />,
      },

      {
        path: "/post/:postId",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/write/:id",
        element: <Write />,
      },
      {
        path: "/single",
        element: <Single />,
      },

    ],
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/single",
    element: <Single />,
  },
  {
    path: "/write",
    element: <Write />,
  },

  
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
