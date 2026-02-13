import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/*
  useAuth:
  --------
  Custom hook to access authentication context.

  Instead of importing AuthContext and useContext
  everywhere, components can simply call useAuth().
*/
export const useAuth = () => {
  return useContext(AuthContext);
};
