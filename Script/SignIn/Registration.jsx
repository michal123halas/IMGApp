import React, { useEffect ,useState} from 'react';

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const styleForm = {
    // width:'100vw',
    // height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    backgroundColor:'white',
    color:'black',
    padding:'80px',
    border: '5px solid green'
}

const Registration = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [passwordVoid, SetPasswordVoid] = useState(true)
    const [isAccountTaken, setIsAccountTaken] = useState(false);

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


            window.location.href = '/login';


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
            window.location.href = '/editor';

            console.log('User signed in with Google:', user);

        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };


    return (

        <form  style={styleForm} onSubmit={handleRegistration}>
            <label htmlFor='email'>Email</label><br/>
            <input type='email' name='email' /><br/>
            <label htmlFor='password'>Password</label><br/>
            <input type='password' name='password' /><br/>
            <label htmlFor='repeatPassword'>repeat Password</label><br/>
            <input type='password' name='repeatPassword' /><br/>
            {!passwordVoid && <div style={{ color: 'red' }}>Passwords do not match.</div>}
            {isAccountTaken && <div style={{ color: 'red' }}>Account is already taken.</div>}
            {isRegistered && <div style={{ color: 'green' }}>Registration successful.</div>}
            <button style={{marginBottom:'20px'}} type='submit'>Registration</button>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>

        </form>
    );
};

export default Registration;
