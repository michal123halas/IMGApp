import React, {useEffect, useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from "./GoogleSDK.jsx";
const Login = () => {
    const handleRegistration = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const auth = getAuth()
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                if (!user.emailVerified) {
                    console.error('You must verify your email before logging in.');
                    return;
                }
            }
            console.log("successful")
            window.location.href = '/editor';
        }catch (error){
            console.error("with not", error)
        }


    }
    return (

    <form onSubmit={handleRegistration}>
        <label htmlFor='email'>Email</label><br />
        <input type='email' name='email' /><br />
        <label htmlFor='password'>Password</label><br />
        <input type='password' name='password' /><br />
        <button type='submit'>Sign in</button>
    </form>

    );
};

export default Login;