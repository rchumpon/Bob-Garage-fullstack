import { createContext, useContext } from "react";

// Create a context to share data across components
export const AppContext = createContext();

// Custom hook to access AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};
