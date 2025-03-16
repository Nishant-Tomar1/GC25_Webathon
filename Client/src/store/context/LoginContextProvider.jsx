import { useContext, useState } from "react"
import { createContext } from "react";

export const loginContext = createContext()

function LoginContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    

    const loginHandler = ( user) => {
        setUser(user);
    }

    const logoutHandler = () => {
        setIsLoggedIn(false);
        setUser({});
    }

    const context = {
        isLoggedIn : isLoggedIn,
        user : user,
        login : loginHandler,
        logout : logoutHandler,
    }

    return(
        <loginContext.Provider value={context}>
            {children}
        </loginContext.Provider>
    )
}

const useLogin = () => useContext(loginContext)

export {useLogin , LoginContextProvider};
