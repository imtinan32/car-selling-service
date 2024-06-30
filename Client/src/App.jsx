/*eslint-disable*/

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SellingItem from './components/CarListing';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />, 
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/vehicles",
    element: <SellingItem />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
