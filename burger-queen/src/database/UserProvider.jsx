import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { createContext, useEffect } from "react";
import { async } from "@firebase/util";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const createUser = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password, displayName);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    const userData = onAuthStateChanged(auth, (userId) => {
      console.log(userId);
      setUser(userId);
    });
    return () => userData();
  }, []);

  // useEffect(() => {
  //   const authState = async ()=>{
  //   onAuthStateChanged(auth, (userId) => {
  //     console.log(userId);
  //      setUser(userId);
  //    });
  //   }
  //   return () => authState();
  // }, []);

  const logOut = () => signOut(auth);

  return (
    <UserContext.Provider value={{ createUser, loginUser, user, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
