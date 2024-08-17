import { createContext, useState } from "react";

export const LoadingContext = createContext(null);

export const LoadingProvider =(props) =>{
    const [loading,SetLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{loading,SetLoading}}>
            {props.children}
        </LoadingContext.Provider>
    )
}