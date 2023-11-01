// for the purpose to have access to certian variables 
// globally in the project
// e.g. tableID

import { createContext, useState } from "react";

export const Context = createContext()

const ContextProvider = ({children}) => {

    console.log("nik in context.jsx")
    const [selectedTable, setSelectedTable] = useState(null);

    return(
        <Context.Provider value={{selectedTable,setSelectedTable}}>
            {children}
        </Context.Provider>
    );
}

export {ContextProvider}