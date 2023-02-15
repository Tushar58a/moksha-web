import React, { createContext, useContext, useState } from "react";

const authUser = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  institution_name: '',
  phone_no: '',
}

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authContext, setAuthContext] = useState(authUser);

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;