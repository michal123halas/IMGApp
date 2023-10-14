import React from 'react';
import {styleHeaderAndFooter} from "./Header.jsx";

const styleLI = {
    height:'100px',
    listStyle:'none',
    color:'white',
    display:'flex',
    margin:'20px',


}
const Footer = () => {
    const home =()=>{
        window.location.href = '/';
    }
    const service =()=>{
        window.location.href = '/service';
    }
    return (
        <footer style={styleHeaderAndFooter}>
            <li style={styleLI}><a onClick={home} style={{color:'white',cursor:'pointer', fontFamily: 'initial'}}>Home</a></li>
            <li style={styleLI}><a onClick={service} style={{color:'white',cursor:'pointer', fontFamily: 'initial'}}>Services</a></li>
            <li style={styleLI}><a  href={'https://github.com/michal123halas'} style={{color:'white',cursor:'pointer', fontFamily: 'initial'}}>About Us</a></li>
            <li style={styleLI}><a href={"mailto:authenticationbird@gmail.com"} style={{color:'white',cursor:'pointer',fontFamily:'initial'}}>Contact</a></li>
        </footer>
    );
};


export default Footer;