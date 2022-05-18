// import React from 'react';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase-config";
// import { createContext} from "react";

// export const UserContext = createContext();

// const UserProvider = ({children}) => {
//     const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

//   return (
//         <UserContext.Provider value={{ createUser }}>
//            {children}
//        </UserContext.Provider>
//   )
// }

// export default UserProvider

import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { createContext, useEffect} from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
  const [user, setUser] = useState('')

  const createUser = (email, password, username) => createUserWithEmailAndPassword(auth, email, password, username);

  const loginUser = (email, password, username) => signInWithEmailAndPassword(auth, email, password, username)

useEffect(() => {
  const userData = onAuthStateChanged(auth, (userId) => {
    console.log(userId);
    setUser(userId);
  });
  return () => userData();
},[]);

const logOut = () => signOut(auth);

  return (
   <UserContext.Provider value={{ createUser, loginUser, user, logOut }}>
  {children}
</UserContext.Provider>
  )
}

export default UserProvider