import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Roles: Admin, Doctor, Patient
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => sessionStorage.getItem("isAdminLoggedIn") === "true"
  );
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(
    () => sessionStorage.getItem("isDoctorLoggedIn") === "true"
  );
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(
    () => sessionStorage.getItem("isPatientLoggedIn") === "true"
  );

  // Persist states to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
    sessionStorage.setItem("isDoctorLoggedIn", isDoctorLoggedIn);
    sessionStorage.setItem("isPatientLoggedIn", isPatientLoggedIn);
  }, [isAdminLoggedIn, isDoctorLoggedIn, isPatientLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isDoctorLoggedIn,
        setIsDoctorLoggedIn,
        isPatientLoggedIn,
        setIsPatientLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
