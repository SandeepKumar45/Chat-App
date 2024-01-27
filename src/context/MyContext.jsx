import React, { createContext, useState } from "react";

export const menuContext = createContext()

function MyContext({children}) {
    const [hidden,setHidden] = useState(false)
  return (
    <menuContext.Provider value={{hidden,setHidden}}>
        {children}
    </menuContext.Provider>
  )
}

export default MyContext