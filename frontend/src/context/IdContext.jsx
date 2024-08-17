import { createContext, useState } from "react";

export const IdContext = createContext(null);

export const IdProvider =(props) =>{
    const [attendance_id,SetAttendance_id] = useState(null);
    return (
        <IdContext.Provider value={{attendance_id,SetAttendance_id}}>
            {props.children}
        </IdContext.Provider>
    )
}