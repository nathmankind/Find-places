import React, { useState, createContext, useEffect } from "react";
import { auth, generateUserDocument } from "./../Service/firebase";

export const UserContext = createContext({ user: null });

type UserProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      setUser(user);
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;
