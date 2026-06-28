import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import App from './App';
import Favs from './pages/favs';
import Seasonal from './pages/seasonal';
import About from './pages/about';
import Profile from './pages/profile';
import Cart from './pages/cart';
import Product from './pages/product';
import Checkout from './pages/checkout';
import Receipt from './pages/receipt';
import Login from './pages/login';

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "/Favs",
    element: <Favs />,
  },
  {
    path: "/Seasonal",
    element: <Seasonal />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/Cart",
    element: <Cart />,
  },
  {
    path: "/Product",
    element: <Product />,
  },
  {
    path: "/Checkout",
    element: <Checkout />,
  },
  {
    path: '/Receipt',
    element: <Receipt />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
