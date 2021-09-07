import React, { createContext, useReducer } from "react";
import { reducer as GlobalReducer, initialState } from "../reducer/GlobalReducer";
export const GlobalContext = createContext();
export const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState)
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )

}
