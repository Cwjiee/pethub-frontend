import { useContext } from "react";
import { GlobalContext } from "./context";

export const useGlobalHook = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalHook must be used inside a GlobalProvider.");
  }

  return context;
};

export default useGlobalHook;
