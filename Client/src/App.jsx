import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SellingItem from './components/SellingItem';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/selling-item",
    element: <SellingItem />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
