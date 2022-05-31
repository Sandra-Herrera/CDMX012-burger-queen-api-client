import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const ViewMenuNewOrder = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/home");
  };

  return (
    <>
      <button onClick={redirectHome}>Back</button>
      <Menu />
    </>
  );
};

export default ViewMenuNewOrder;
