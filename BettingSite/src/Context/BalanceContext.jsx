// BalanceContext.jsx
import { createContext, useContext, useState } from "react";

const BalanceContext = createContext();

export function BalanceContextProvider({ children }) {
  const [totalBalance, setTotalBalance] = useState(1000);

  return (
    <BalanceContext.Provider value={{ totalBalance, setTotalBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}

// Custom hook til at bruge balancen
export const useUserBalance = () => {
  return useContext(BalanceContext);
};

export default BalanceContext;
