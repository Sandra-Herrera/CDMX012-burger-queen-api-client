import React, { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "./firebase-config";
import { createContext } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const createUser = (email, password, displayName) =>(
    createUserWithEmailAndPassword(auth, email, password, displayName)
  )

  const loginUser = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password).then(()=>{setUser(auth.currentUser)})
  }
  // console.log({user})

  // useEffect(() => {
  //   const userData = onAuthStateChanged(auth, (userId) => {
  //     console.log({userId});
  //     // setUser(userId);
  //   });
  //   return () => userData();
  // }, []);

  // useEffect(()=>{
  //   console.log(auth.currentUser, user)
  // },[])

  const logOut = () => signOut(auth);
  // const logOut = () => signOut(auth).then(()=>{console.log("cerrado")});

  return (
    <UserContext.Provider value={{ createUser, loginUser, user, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;
