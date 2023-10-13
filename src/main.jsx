import React from 'react';
import * as ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ImageEditorFinish from "../Script/ImageEditorFinish.jsx";
import './index.css';

import Login from "../Script/SignIn/Login.jsx";
import Header from "../Script/InterfaceComponents/Header.jsx";

import ResetPassword from "../Script/SignIn/ResetPassword.jsx";
import Registration from "../Script/SignIn/Registration.jsx";
import LandingPage from "../Script/Story/LandingPage:.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>
    },

    {
        path: "/editor",
        element: <ImageEditorFinish/> 
    },
    {
        path: "/registration",
        element: <Registration/>,
    },
    {
        path: "/login",
        element: <Login/> 
    },
    {
        path: "/reset",
        element: <ResetPassword/>
    },

]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Header/>
        <RouterProvider router={router}/>
    </React.StrictMode>
);


// <Router>
//     <Route path="/editors/:users" element={<ImageEditorFinish />} />
//     <Route path="/registration" element={<LoginFinish />} />
// </Router>