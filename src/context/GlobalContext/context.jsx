import { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export function GlobalProvider(props) {
  const { children } = props;
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUserId = sessionStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userId);
  }, [token, userId]);

  return (
    <GlobalContext.Provider value={{ token, setToken, userId, setUserId}}>
      {children}
    </GlobalContext.Provider>
  );
}
