import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./database/UserProvider";
import Login from "./components/login/Login";
import Signup from "./components/signUp/Signup";
import Home from "./components/home/Home";
import "./App.css";

function App() {
  const { user } = useContext(UserContext);
  let userRole = null;
  if(user?.photoURL){
  userRole = user.photoURL
}

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      {user && <Route exact path="/home" element={<Home />} />}
      {userRole === "administrador" && (
      <Route exact path="/signup" element={<Signup />} />
      )};
    </Routes>
  );
}

export default App;
