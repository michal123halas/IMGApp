import React ,{useState}from 'react';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';

import app from "./GoogleSDK.jsx";
import {styleForm} from "./Registration.jsx";





const style = {
    width:'100vw',
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',

}


const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
                    setErrorMessage('You must verify your email before logging in.');
                    console.error('You must verify your email before logging in.');
                    return;
                }
            }
            setSuccessMessage('Login successful.');
            setTimeout(() => {
                window.location.href = '/editor';
            }, 3000);

        }catch (error){
            console.error("with not", error)
                setErrorMessage('Invalid email or password. Please try again.');

        }

    }

    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user) {
                if (!user.emailVerified) {
                    setErrorMessage('You must verify your email before logging in.');
                    console.error('You must verify your email before logging in.');
                    return;
                }
            }

            console.log('User signed in with Google:', user);

            setSuccessMessage('Login successful.');
            setTimeout(() => {
                window.location.href = '/editor';
            }, 3000);
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };
    const resetPassword =()=>{
        window.location.href = '/reset';
    }

    return (
        <>



<div style={style}>
    <form style={styleForm} onSubmit={handleRegistration}>
        <label htmlFor='email'>Email</label><br />
        <input type='email' name='email' /><br />
        <label htmlFor='password'>Password</label><br />
        <input type='password' name='password' /><br />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        <button type='submit'>Sign in</button>
        <button style={{marginTop:'20px'}} onClick={handleGoogleSignIn}>Sign in with Google</button>
        <button style={{marginTop:'20px'}} onClick={resetPassword}>Reset password</button>
    </form>
</div>

        </>


    );
};

export default Login;