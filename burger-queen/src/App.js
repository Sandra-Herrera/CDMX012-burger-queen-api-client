import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./database/UserProvider";
import Login from "./components/login/Login";
import Signup from "./components/signUp/Signup";
import Home from "./components/home/Home";
import "./App.css";
import Products from "./components/products/Products";
import Error from "./components/error/Error";
import NewOrder from "./components/menuNewOrder/NewOrder";
import ViewMenuNewOrder from "./components/menuNewOrder/ViewMenuNewOrder";
// import OrderContextProvider from "./components/context/OrderContext";

function App() {
  const { user } = useContext(UserContext);
  let userRole = null;
  if (user?.photoURL) {
    userRole = user.photoURL;
  }

  return (
    // <OrderContextProvider>
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
      {userRole === "administrador" && (
        <Route exact path="/NewOrder" element={<NewOrder />} />
      )}
      ;
      <Route path="*" element={<Error />} />
    </Routes>
    // </OrderContextProvider>
  );
}

export default App;
