import React, { useState} from 'react';

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {Link} from "react-router-dom";
import {styleLink} from "./Login.jsx";

export const styleForm = {

    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    backgroundColor:'white',
    color:'black',
    padding:'50px',
    border: '30px solid green',
    borderRadius: '10px',

}
export const styleDiv = {
    width:'100vw',
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',



}


const Registration = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [passwordVoid, SetPasswordVoid] = useState(true)
    const [isAccountTaken, setIsAccountTaken] = useState(false);
    const [isLogin, setIsLogin] = useState(false)

    const handleRegistration = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const repeatPassword = event.target.repeatPassword.value

        if(password !== repeatPassword){
            SetPasswordVoid(false)
        }


        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User registered successfully:', user);
            await sendEmailVerification(user)
            setIsRegistered(false)





        } catch (error) {
            console.error('Error registering user:', error);
            setIsAccountTaken(true)
        }
    };
    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {

            const result = await signInWithPopup(auth, provider);
            const user = result.user;


            console.log('User signed in with Google:', user);
            setIsLogin(true)

        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };


    return (

        <div style={styleDiv}>
            {isLogin ? (<Link style={styleLink} to='/editor'>Have a great time!" 🎉<br/>Click mi!! 🤖 </Link>):(
        <form  style={styleForm} onSubmit={handleRegistration}>
            <label htmlFor='email'>Email</label><br/>
            <input type='email' name='email' /><br/>
            <label htmlFor='password'>Password</label><br/>
            <input type='password' name='password' /><br/>
            <label htmlFor='repeatPassword'>repeat Password</label><br/>
            <input type='password' name='repeatPassword' /><br/>
            {!passwordVoid && <div style={{ color: 'red' }}>Passwords do not match.</div>}
            {isAccountTaken && <div style={{ color: 'red' }}>Account is already taken.</div>}
            {isRegistered && <div style={{ color: 'green' }}>Registration successful. Please go verify your email. </div>}
            <button style={{marginBottom:'20px'}} type='submit'>Registration</button>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>

        </form>
            )}
        </div>
    );
};

export default Registration;
