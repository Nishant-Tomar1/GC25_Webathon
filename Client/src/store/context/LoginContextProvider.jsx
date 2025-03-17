import { useContext, useState } from "react"
import { createContext } from "react";

export const loginContext = createContext()

function LoginContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [notifications, setNotification] = useState(1);
    

    const loginHandler = ( user) => {
        setIsLoggedIn(true);
        setUser(user);
    }

    const logoutHandler = () => {
        setIsLoggedIn(false);
        setUser({});
    }

    const notificationHandler = (newcount) => {
        setNotification(newcount);
    }

    const context = {
        isLoggedIn : isLoggedIn,
        user : user,
        notifications : notifications,
        login : loginHandler,
        logout : logoutHandler,
        notificationHandler : notificationHandler
    }

    return(
        <loginContext.Provider value={context}>
            {children}
        </loginContext.Provider>
    )
}

const useLogin = () => useContext(loginContext)

export {useLogin, LoginContextProvider};
