import React, { useEffect ,useState} from 'react';

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';





const Registration = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [passwordVoid, SetPasswordVoid] = useState(true)

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
        }
    };

    return (
        <form onSubmit={handleRegistration}>
            <label htmlFor='email'>Email</label><br />
            <input type='email' name='email' /><br />
            <label htmlFor='password'>Password</label><br />
            <input type='password' name='password' /><br />
            <label htmlFor='repeatPassword'>repeat Password</label><br />
            <input type='password' name='repeatPassword' /><br />
            {!passwordVoid && <div style={{ color: 'red' }}>Passwords do not match.</div>}
            {passwordVoid && <div style={{ color: 'green' }}>Registration successful.</div>}
            <button type='submit'>Registration</button>
        </form>
    );
};

export default Registration;
