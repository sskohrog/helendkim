import React, { useEffect, useState } from 'react'

const GlobalContext = React.createContext(null)

function GlobalProvider({ children }) {
  const [isAdminMode, setIsAdminMode] = useState(false)
  useEffect(() => {}, [])

  return (
    <GlobalContext.Provider value={{ isAdminMode, setIsAdminMode }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }
