// BalanceContext.jsx
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [totalBalance, setTotalBalance] = useState(null);
  const [depositLimit, setDepositLimit] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);


  return (
    <UserContext.Provider value={{ totalBalance, setTotalBalance, depositLimit, setDepositLimit, activeStatus, setActiveStatus }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook til at bruge balancen
export const useUserInfo = () => {
  return useContext(UserContext);
};

// export default UserContext;
