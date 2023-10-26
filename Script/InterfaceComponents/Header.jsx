import React, {  useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faHouse,faImage,faUsers,faHandshake,faArrowDown,faArrowUp,faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged ,signOut} from 'firebase/auth';
import {Link} from "react-router-dom";


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
    const [flex , setFlex] = useState('flex')

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
                console.log('Good');
                setFlex('none')

            })
            .catch((error) => {
                console.error('NotGood:', error);
            });
    };



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
            <li style={{cursor:'pointer', border:'2px solid blue', marginTop:'30px',padding:'10px',borderRadius:'10px',fontFamily:'initial'}} ><FontAwesomeIcon icon={faHouse} style={{margin:' 0 10px 0 10px'}}/>
                <Link to="/">Home  </Link>
           </li>
            <li style={{cursor: 'pointer', border: '2px solid blue', marginTop: '10px', padding: '10px', borderRadius: '10px', fontFamily: 'initial'}}>
                <FontAwesomeIcon icon={faImage} style={{margin: '0 10px 0 10px'}}/>
                {userName ? (
                    <Link to="/editor">Editor</Link>
                ) : (
                    <Link to="/login">Editor</Link>
                )}
            </li>
            <li style={{cursor:'pointer', border:'2px solid blue', marginTop:'10px',padding:'10px',borderRadius:'10px',fontFamily:'initial'}}><FontAwesomeIcon icon={faHandshake} style={{margin:' 0 10px 0 10px'}}/>
                <Link to="/registration">Register  </Link>
            </li>
            <li style={{cursor:'pointer', border:'2px solid blue', marginTop:'10px',padding:'10px',borderRadius:'10px',fontFamily:'initial'}}><FontAwesomeIcon icon={faUsers} style={{margin:' 0 10px 0 10px'}}/>
                <Link to="/login">Login  </Link>
            </li>
        </ul>
    )}
            {logOutMenu && (
                <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                    <button  style={{borderRadius:'10px solid red', backgroundColor:'red',marginTop:'30px', display:`${flex}`}} onClick={handleSignOut}><FontAwesomeIcon icon={faArrowRightToBracket} style={{margin:' 0 10px 0 10px'}}/>  <Link style={{color:'white',height:'100px'}} to="/login">LogOut</Link></button>
                </div>
            )}
        </>
    );
};

export default Header;
