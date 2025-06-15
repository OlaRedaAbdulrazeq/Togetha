// contexts/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../api/user";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const isAuthenticated = !!token;

   useEffect(() => {
    if (token && !user) {
      getProfile(token)
        .then((data) => {
          const fullUser = { ...data, token };
          setUser(fullUser);
          localStorage.setItem("user", JSON.stringify(fullUser)); // ensure sync
        })
        .catch(() => {
          // Token invalid — clean up
          setToken(null);
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        });
    }
  }, [token]);

  const login = (userData, authToken) => {
   const fullUser = { ...userData, token: authToken };
    setUser(fullUser);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(fullUser));
    
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{
      user,
      token,
      isAuthenticated,
      setUser,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);