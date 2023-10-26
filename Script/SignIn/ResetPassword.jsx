import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { styleForm } from "./Registration.jsx";
import {styleDiv} from "./Registration.jsx";

const ResetPassword = () => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [goToEmail, setGoToEmail] = useState(false);





    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        resetPassword(email);
        setGoToEmail(!goToEmail)
    };

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('E-mail z linkiem do zresetowania hasła został wysłany.');
            })
            .catch((error) => {
                console.error('Błąd podczas wysyłania e-maila z linkiem resetującym hasło:', error);
            });
    };

    return (
        <div style={styleDiv}>
            <form style={styleForm} onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label><br />
                <input type='email' name='email' value={email} onChange={handleEmailChange} /><br />
                <button type="submit" style={{marginTop:'20px'}}>Reset Password</button>
                {goToEmail &&(<p style={{color:'green'}}>Go to email</p>)}
            </form>
        </div>
    );
};

export default ResetPassword;
