import React,{createContext,useState} from "react";
export  const LoginContext = createContext(null)


const LoginProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');
    const handleSetUserEmail = (email) => {
        setUserEmail(email);
    };


    return (
        <LoginContext.Provider value={{ userEmail, handleSetUserEmail}}>
            {children}
        </LoginContext.Provider>
    );
};
export default LoginProvider
