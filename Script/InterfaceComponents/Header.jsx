import React, {  useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { getAuth, onAuthStateChanged ,signOut} from 'firebase/auth';


const style = {
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
    backgroundColor:'green'
};

const checkEmailVerification = (user) => {
    return user && user.emailVerified;
};

const Header = () => {
    const [userName, setUserName] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [logOutMenu, setLogOutMenu] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const logOutList =()=>{
        setLogOutMenu(!logOutMenu)
    }

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userEmail = user.email;
                setUserName(userEmail);
                setIsEmailVerified(checkEmailVerification(user));
            } else {
                setUserName('');
                setIsEmailVerified(false); // Ensure isEmailVerified is false when user is not logged in
            }
        });

        return () => {
            unsubscribe(); // Cleanup the auth state listener when component is unmounted
        };
    }, []);
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                window.location.href = '/login';
                console.log('Pomyślnie wylogowano użytkownika.');

            })
            .catch((error) => {
                console.error('Błąd podczas wylogowywania:', error);
            });
    };

    const moveMenu = ()=>{
        window.location.href = '/';
    }
    const moveEditor = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && isEmailVerified) {
            window.location.href = '/editor';
        } else {

            window.location.href = '/login';
        }
    };
    const moveRegistration = ()=>{
        window.location.href = '/registration';
    }
    const moveLogin = ()=>{
        window.location.href = '/login';
    }

    return (
        <>
        <header style={style}>
            <div style={{margin:'20px'}} onClick={toggleMenu}>LOGO</div>
            {userName ? (
                isEmailVerified && (
                    <div style={{margin:'20px'}}>
                        <FontAwesomeIcon icon={faUser} />
                        <h4 onClick={logOutList}>{userName}</h4>
                    </div>
                )
            ) : (
                <div>Unknown</div>
            )}

        </header>
    {isMenuOpen && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><a onClick={moveMenu}>Home</a></li>
            <li><a onClick={moveEditor}>Editor</a></li>
            <li><a onClick={moveRegistration}>Registration</a></li>
            <li><a onClick={moveLogin}>Login</a></li>
        </ul>
    )}
            {logOutMenu && (
                <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                    <button  style={{borderRadius:'10px solid red', backgroundColor:'red'}} onClick={handleSignOut}>LogOut</button>
                </div>
            )}
        </>
    );
};

export default Header;
