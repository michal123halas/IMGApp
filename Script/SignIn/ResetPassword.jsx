import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { styleForm } from "./Registration.jsx";

const ResetPassword = () => {
    const auth = getAuth();
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        resetPassword(email);
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
        <div style={styleForm}>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label><br />
                <input type='email' name='email' value={email} onChange={handleEmailChange} /><br />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
