import React from 'react';
import * as ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ImageEditorFinish from "../Script/ImageEditorFinish.jsx";
import './index.css';
import LoginFinish from "../Script/LoginFinish.jsx";
import Login from "../Script/SignIn/Login.jsx";

const router = createBrowserRouter([
    {
        path: "/editor",
        element: <ImageEditorFinish/>,
    },
    {
        path: "/registration",
        element: <LoginFinish/>,
    },
    {
        path: "/login",
        element: <Login/>,
    }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);


// <Router>
//     <Route path="/editors/:users" element={<ImageEditorFinish />} />
//     <Route path="/registration" element={<LoginFinish />} />
// </Router>