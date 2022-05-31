import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./database/UserProvider";
import Login from "./components/login/Login";
import Signup from "./components/signUp/Signup";
import Home from "./components/home/Home";
import "./App.css";
import Products from "./components/products/Products";
import Error from "./components/error/Error";


import ViewMenuNewOrder from "./components/menuNewOrder/ViewMenuNewOrder";

function App() {
  const { user } = useContext(UserContext);
  let userRole = null;
  if (user?.photoURL) {
    userRole = user.photoURL;
  }

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      {user && <Route exact path="/home" element={<Home />} />}
      {userRole === "administrador" && (
        <Route exact path="/signup" element={<Signup />} />
      )}
      ;
      {userRole === "administrador" && (
        <Route exact path="/products" element={<Products />} />
      )}
      ;
      {userRole === "mesero" && (
        <Route exact path="/order" element={<ViewMenuNewOrder />} />
      )}
      ;
      {userRole === "administrador" && (
        <Route exact path="/order" element={<ViewMenuNewOrder />} />
      )}
      ;
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
