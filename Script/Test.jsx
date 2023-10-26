import React from 'react';
import {Link} from "react-router-dom";
import {margin} from "@mui/system";

const Test = () => {
    return (
        <div>
            <ul style={{display:'flex',listStyle:'none'}}>
                <li style={{margin:'20px'}}>
                    <Link to="/">Home  </Link>
                </li>
                <li style={{margin:'20px'}}>
                    <Link to="/editor">Editor</Link>
                </li>
                <li style={{margin:'20px'}}>
                    <Link to="/registration">Register  </Link>
                </li>
                <li style={{margin:'20px'}}>
                    <Link to="/login">Login  </Link>
                </li>
                <li style={{margin:'20px'}}>
                    <Link to="/reset">Reset   </Link>
                </li>
                <li style={{margin:'20px'}}>
                    <Link to="/service">Service   </Link>
                </li>
            </ul>
        </div>
    );
};

export default Test;