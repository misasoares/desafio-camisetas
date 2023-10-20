import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import React from "react";
import List from "../pages/List";
import { Navbar } from "../components/Navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar children={<Home></Home>}/>,
    errorElement: <h1>NOT FOUND</h1>,
  },
  {
    path: "/list",
    element: <Navbar children={<List></List>}/>,
    errorElement: <h1>NOT FOUND</h1>,
  },
]);

const RoutesApp: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RoutesApp;
