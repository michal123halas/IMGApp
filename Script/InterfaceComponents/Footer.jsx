import React from 'react';
import {styleHeaderAndFooter} from "./Header.jsx";
import {Link} from "react-router-dom";

const styleLI = {
    height:'100px',
    listStyle:'none',
    color:'white',
    display:'flex',
    margin:'20px',


}
const Footer = () => {


    return (
        <footer style={styleHeaderAndFooter}>
            <li style={styleLI}><a style={{color:'white',cursor:'pointer', fontFamily: 'initial'}}> <Link style={{color:'white'}} to="/">Home  </Link></a></li>
            <li style={styleLI}><a  style={{color:'white',cursor:'pointer', fontFamily: 'initial'}}>  <Link style={{color:'white'}} to="/service">Service   </Link></a></li>
            <li style={styleLI}><a  href={'https://github.com/michal123halas'} style={{color:'white',cursor:'pointer', fontFamily: 'initial'}}>About Us</a></li>
            <li style={styleLI}><a href={"mailto:authenticationbird@gmail.com"} style={{color:'white',cursor:'pointer',fontFamily:'initial'}}>Contact</a></li>
        </footer>
    );
};


export default Footer;