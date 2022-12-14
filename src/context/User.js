import React, { createContext, useEffect, useState } from "react";

// Create user context
const UserContext = createContext({});

// Create context provider
const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  // Update token and user id in local storage everytime user info is updated
  useEffect(() => {
    if(userInfo && userInfo.token){
      localStorage.setItem('token', userInfo.token)
      localStorage.setItem('id', userInfo._id)
    }
  }, [userInfo])
  
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };