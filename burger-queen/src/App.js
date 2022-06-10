import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./database/UserProvider";
import Login from "./components/login/Login";
import Kitchen from "./components/kitchen/Kitchen";
import Team from "./components/team/Team";
import Signup from "./components/signUp/Signup";
import Home from "./components/home/Home";
import "./App.css";
import Products from "./components/products/Products";
import Error from "./components/error/Error";
import ErrorWithoutUser from "./components/error/ErrorWithoutUser";
import NewOrder from "./components/menuNewOrder/NewOrder";
import ViewMenuNewOrder from "./components/menuNewOrder/ViewMenuNewOrder";

function App() {
  const { user } = useContext(UserContext);
  let userRole = null;
  if (user?.photoURL) {
    userRole = user.photoURL;
  }

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />;
      {userRole?.toLowerCase() === "Kitchen".toLowerCase() && (
        <Route exact path="/kitchen" element={<Kitchen />} />
      )}
      ;
      {userRole?.toLowerCase() === "Administrator".toLowerCase() && (
        <Route exact path="/kitchen" element={<Kitchen />} />
      )}
      ;{user && <Route exact path="/home" element={<Home />} />};
      {userRole?.toLowerCase() === "Administrator".toLowerCase() && (
        <Route exact path="/team" element={<Team />} />
      )}
      ;
      {userRole?.toLowerCase() === "Administrator".toLowerCase() && (
        <Route exact path="/signup" element={<Signup />} />
      )}
      ;
      {userRole?.toLowerCase() === "Administrator".toLowerCase() && (
        <Route exact path="/products" element={<Products />} />
      )}
      ;
      {userRole?.toLowerCase() === "Waiter".toLowerCase() && (
        <Route exact path="/order" element={<ViewMenuNewOrder />} />
      )}
      ;
      {userRole?.toLowerCase() === "Administrator".toLowerCase() && (
        <Route exact path="/order" element={<ViewMenuNewOrder />} />
      )}
      ;
      {userRole?.toLowerCase() === "Administrator".toLowerCase() && (
        <Route exact path="/NewOrder" element={<NewOrder />} />
      )}
      ;{!user && <Route path="*" element={<ErrorWithoutUser />} />};
      <Route path="*" element={<Error />} />;
    </Routes>
  );
}

export default App;
