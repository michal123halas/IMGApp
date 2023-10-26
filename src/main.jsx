import React from 'react';
import * as ReactDOM from "react-dom/client";
// import { createRoot } from 'react-dom/client';
// import {
//     createBrowserRouter,
//     RouterProvider,
// } from "react-router-dom";

import ImageEditorFinish from "../Script/ImageEditorFinish.jsx";
import './index.css';

import Login from "../Script/SignIn/Login.jsx";
import Header from "../Script/InterfaceComponents/Header.jsx";
import {BrowserRouter, Route,Routes} from "react-router-dom";
import ResetPassword from "../Script/SignIn/ResetPassword.jsx";
import Registration from "../Script/SignIn/Registration.jsx";
import LandingPage from "../Script/Story/LandingPage.jsx";
import Footer from "../Script/InterfaceComponents/Footer.jsx";
import Service from "../Script/InterfaceComponents/Service.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>


        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="editor" element={<ImageEditorFinish />}></Route>
                <Route path="registration" element={<Registration />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="reset" element={<ResetPassword/>}></Route>
                <Route path="service" element={<Service/>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>

    </React.StrictMode>
);

