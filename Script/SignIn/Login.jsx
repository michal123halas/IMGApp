import React ,{useState}from 'react';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import {styleForm} from "./Registration.jsx";
import {styleDiv} from "./Registration.jsx"
import {Link} from "react-router-dom";

export const styleLink ={
    borderRadius:'15px',
    border: '2px solid green',
    width:'300px',
    height:'150px',
    backgroundColor:'green',
    color:'white',
    textAlign:'center',
    paddingTop:'100px'

}
export const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [inputValue, setInputValue] = useState('')

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
            setIsLogged(true)


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
            setIsLogged(true)

        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };
    const easterEgg =(e)=>{
        setInputValue(e.target.value)
    }


    return (
        <>



<div style={styleDiv}>
    {isLogged ? (
      <Link style={styleLink} to='/editor'>Have a great time!" 🎉<br/>Click mi!! 🤖 </Link>
        ) : (

    <form style={styleForm} onSubmit={handleRegistration}>
        <label htmlFor='email'>Email</label><br />
        <input value={inputValue} onChange={easterEgg} type='email' name='email' /><br />
        <label htmlFor='password'>Password</label><br />
        <input type='password' name='password' /><br />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        <button type='submit'>Sign in</button>
        <button style={{marginTop:'20px'}} onClick={handleGoogleSignIn}>Sign in with Google</button>
        {inputValue==='react'&&   <Link style={{backgroundColor:'red',borderRadius:'10px',color:'white',width:'150px',textAlign:"center",margin:'10px'}} to="/editor">DeveloperLink</Link>}
        <button style={{marginTop:'20px'}} > <Link style={{color:'white'}} to="/reset">Reset password</Link></button>
        <p>If you're testing my application,<br/> you don't need to create an account to access the editor.<br/> Just type 'react' in the email field,<br/> and you'll receive a special redirection button</p>
    </form>

        )}
</div>

        </>


    );
};

export default Login;