import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Components/Home'
import Layout from './Components/Layout';
import Register from './Components/Register'
import Forgot from './Components/ForgotPassword'
import LogIn from './Components/login'
import Credits from './Components/Credits';
import Debits from './Components/Debits';
import Profile from './Components/Profile';
import Insert from './Components/Insert';
import Trends from './Components/Trends'


import App from './App';


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Help from './Components/Help';
import Contact from './Components/Contact';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path='Home' element={<Home />}/>
      <Route path='Layout' element={<Layout />}/>
      <Route path='Register' element={<Register />}/>
      <Route path='Forgot' element={<Forgot />} /> 
      <Route path='LogIn' element={<LogIn />} />
      <Route path='Credits' element={<Credits />} />
      <Route path='Debits' element={<Debits />} />
      <Route path='Profile' element={<Profile />} />
      <Route path='Help' element={<Help />}/>
      <Route path='Contact' element={<Contact />}/>
      <Route path='Insert' element={<Insert />}/>
      <Route path='Trends' element={<Trends />}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);





