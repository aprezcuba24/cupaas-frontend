import React, { createContext, useContext, PropsWithChildren } from "react";

type SecurityContextType = PropsWithChildren & {
  authenticated: boolean;
}

const SecurityContext = createContext({ authenticated: false })

export const SecurityContextProvider = ({ children, ...props }: SecurityContextType) => {
  const [authenticated, setAuthenticated] = React.useState(false);
  return (
    <SecurityContext.Provider {...props} value={{
      authenticated,
    }}>
      {children}
    </SecurityContext.Provider>
  )
}

export const useSecurityContext = () => {
  const ctx = useContext(SecurityContext);
  if (!ctx) {
    throw Error('The `useSecurityContext` hook must be called from a descendent of the `SecurityContext`.');
  }

  return {
    authenticated: ctx.authenticated,
  }
}
