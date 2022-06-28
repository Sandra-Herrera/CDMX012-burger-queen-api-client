import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { createContext } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const createUser = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password, displayName);

  const loginUser = (email, password) => {
    // signInWithEmailAndPassword(auth, email, password).then(()=>{setUser(auth.currentUser)})
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.localStorage.setItem("user", JSON.stringify(auth.currentUser));
        // setUser(window.localStorage.getItem("user"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setContextUser = (localStorageUser) => {
    setUser(localStorageUser);
  };

  // console.log({ user });

  // const setContextUser = () =>{
  //  setUser(localStorage.getItem("user"));
  // }
  //   console.log({user})

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

  // const logOut = () => signOut(auth);
  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserContext.Provider
      value={{ createUser, loginUser, user, logOut, setContextUser }}
    >
      {/* <UserContext.Provider value={{ createUser, loginUser, user, logOut }}> */}
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;
