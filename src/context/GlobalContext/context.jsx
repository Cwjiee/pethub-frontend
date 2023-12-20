import { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export function GlobalProvider(props) {
  const { children } = props;
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUsername = sessionStorage.getItem("username");

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
  }, [token, username]);

  return (
    <GlobalContext.Provider value={{ token, setToken, username, setUsername }}>
      {children}
    </GlobalContext.Provider>
  );
}
