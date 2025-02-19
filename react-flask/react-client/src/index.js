import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';

import App from './App';
import Favs from './pages/favs';
import Seasonal from './pages/seasonal';
import About from './pages/about';
import Profile from './pages/profile';
import EmptyCart from './pages/emptycart';
import Product from './pages/product';

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
    element: <EmptyCart />,
  },
  {
    path: "/Product",
    element: <Product />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
