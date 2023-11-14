import React from 'react';
import ReactDOM from 'react-dom/client';



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//impoort Component
import Signin from "./components/Login";
import Album from './components/Album';
import Register from './components/Register';
import Hompage from './components/Homepage';
import Calendar from './components/MyCalender';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Testtailwind from './components/Testtailwind';

const router = createBrowserRouter([
  {path: "/",element: <Hompage/>,}
  ,{path: "/home",element: <Hompage/>,}
  ,{path: "/login",element: <Signin/>,}
  ,{path: "/album",element: <Album/>,}
  ,{path: "/register",element: <Register/>,}
  ,{path: "/Calender",element: <Calendar/>,}
  ,{path: "/Navbar",element: <Navbar/>,}
  ,{path: "/Searchbar",element: <Searchbar/>,}
  ,{path: "/Test",element: <Testtailwind/>,}


  // ,{path: "/test",element: <Calendar/>,}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);

