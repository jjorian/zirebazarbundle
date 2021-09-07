import React, { createContext, useReducer } from "react";
import { reducer as ShopReducer, initialState } from "../reducer/ShopReducer";
export const ShopContext = createContext();
export const ShopProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ShopReducer, initialState);
    return (
        <ShopContext.Provider value={{ shopState: state, shopDispatch: dispatch }}>
            {children}
        </ShopContext.Provider>
    )
}
