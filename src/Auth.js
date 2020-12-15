import React from "react";
import { useHistory } from "react-router-dom";

import { getCurrentUser, loginUser, registerUser } from "./api-client";

const jwt = window.localStorage.getItem("jwt");

export const AuthContext = React.createContext({
  setUser: () => void undefined,
  user: {},
});

export function AuthProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = React.useState(null);

  const registerNewUser = (newUser) => registerUser(newUser).then(setUser);

  const signInUser = (user) => loginUser(user).then(setUser);

  const signOutUser = () => {
    window.localStorage.removeItem("jwt");
    setUser(null);
  };

  React.useEffect(() => {
    if (jwt) {
      getCurrentUser()
        .then(setUser)
        .catch((e) => {
          console.error(`Could not get current user. `, e);
          setUser(null);
        });
    } else {
      history.push('/')
    }
  }, [history]);

  return (
    <AuthContext.Provider
      value={{ signInUser, signOutUser, registerNewUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
