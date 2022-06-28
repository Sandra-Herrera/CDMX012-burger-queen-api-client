import React, { useContext } from "react";
// import React from "react";
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
import OrdersReady from "./components/ordersready/OrdersReady";

function App() {
  const { user, setContextUser } = useContext(UserContext);

  if (setContextUser) {
    setContextUser(window.localStorage.getItem("user"));
  }
  // const user = window.localStorage.getItem("user");

  let userRole = null;
  // useEffect(() => {
  if (user) {
    const data = JSON.parse(user);
    if (data?.photoURL) {
      console.log(data);
      userRole = data.photoURL;
    }
  }
  // },[user])

  // if (user) {
  //   const data = JSON.parse(user);
  //   if (data?.photoURL) {
  //     console.log(data);
  //     userRole = data.photoURL;
  //   }
  // }

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
        <Route exact path="/ordersReady" element={<OrdersReady />} />
      )}
      ;
      {userRole?.toLowerCase() === "Waiter".toLowerCase() && (
        <Route exact path="/ordersReady" element={<OrdersReady />} />
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
