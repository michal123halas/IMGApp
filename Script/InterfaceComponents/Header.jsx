import React, {  useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faHouse,faImage,faUsers,faHandshake,faArrowDown,faArrowUp,faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged ,signOut} from 'firebase/auth';


export const styleHeaderAndFooter = {
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
    backgroundColor:'rgb(51 129 55) ',
    boxShadow: 'rgb(51 129 55) -7px 12px 9px 13px'
};

const checkEmailVerification = (user) => {
    return user && user.emailVerified;
};

const Header = () => {
    const [userName, setUserName] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [logOutMenu, setLogOutMenu] = useState(false)
    const [arrowIcon, setArrowIcon] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setArrowIcon(isMenuOpen ? faArrowUp : faArrowDown);
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
                setIsEmailVerified(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                window.location.href = '/login';
                console.log('Good');

            })
            .catch((error) => {
                console.error('NotGood:', error);
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
        <header style={styleHeaderAndFooter}>
            <div style={{margin:'50px 0 0 20px', cursor:'pointer', fontSize:'30px', fontFamily:'fantasy'}} onClick={toggleMenu}><FontAwesomeIcon icon={arrowIcon} style={{margin:' 0 10px 0 10px'}}/>Menu</div>
            {userName ? (
                isEmailVerified && (
                    <div style={{margin:'20px', cursor:'pointer',}}>
                        <FontAwesomeIcon icon={faUser} style={{width:'200px',fontSize:'30px'}}/>
                        <h4 onClick={logOutList} style={{fontFamily:'fantasy'}}>{userName}</h4>
                    </div>
                )
            ) : (<div style={{marginTop:'20px'}}>
                <FontAwesomeIcon icon={faUser} style={{width:'200px',fontSize:'30px'}}/>
                <div style={{textAlign:'center',fontFamily:'fantasy'}}>Unknown</div>
                </div>

            )}

        </header>
    {isMenuOpen && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{cursor:'pointer', border:'2px solid blue', marginTop:'30px',padding:'10px',borderRadius:'10px',fontFamily:'initial'}} ><FontAwesomeIcon icon={faHouse} style={{margin:' 0 10px 0 10px'}}/><a onClick={moveMenu}>Home</a></li>
            <li style={{cursor:'pointer', border:'2px solid blue', marginTop:'10px',padding:'10px',borderRadius:'10px',fontFamily:'initial'}}><FontAwesomeIcon icon={faImage} style={{margin:' 0 10px 0 10px'}}/><a onClick={moveEditor}>Editor</a></li>
            <li style={{cursor:'pointer', border:'2px solid blue', marginTop:'10px',padding:'10px',borderRadius:'10px',fontFamily:'initial'}}><FontAwesomeIcon icon={faHandshake} style={{margin:' 0 10px 0 10px'}}/><a onClick={moveRegistration}>Registration</a></li>
            <li style={{cursor:'pointer', border:'2px solid blue', marginTop:'10px',padding:'10px',borderRadius:'10px',fontFamily:'initial'}}><FontAwesomeIcon icon={faUsers} style={{margin:' 0 10px 0 10px'}}/><a onClick={moveLogin}>Login</a></li>
        </ul>
    )}
            {logOutMenu && (
                <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                    <button  style={{borderRadius:'10px solid red', backgroundColor:'red',marginTop:'30px'}} onClick={handleSignOut}><FontAwesomeIcon icon={faArrowRightToBracket} style={{margin:' 0 10px 0 10px'}}/>LogOut</button>
                </div>
            )}
        </>
    );
};

export default Header;
