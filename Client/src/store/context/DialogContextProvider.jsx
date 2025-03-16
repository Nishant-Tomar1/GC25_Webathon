import { createContext, useContext, useState } from "react";

const dialogContext = createContext()

function DialogContextProvider({children}){
    const [open , setOpen] = useState(false);

    const toggleDialog = () => { 
        setOpen(prev => !prev);
    }

    const setDialog = (state) => {
        setOpen(state)
    }

    return(
        <dialogContext.Provider value={{open, toggleDialog, setDialog}}>
            {children}
        </dialogContext.Provider>
    )
}

const useDialog = ()=> useContext(dialogContext) 

export  {useDialog, DialogContextProvider};