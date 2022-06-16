import React, { useState } from "react";
import PropTypes from "prop-types";

const OrderContext = React.createContext();

export const OrderContextProvider = (props) => {
  const [order, setOrder] = useState([]);
  const [amount, setAmount] = useState(0);

  const sendContextOrder = (meals) => {
    setOrder(meals);
  };
  const sendContextAmount = (total) => {
    setAmount(total);
  };

  return (
    <OrderContext.Provider
      value={{ order, sendContextOrder, amount, sendContextAmount }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContext;

OrderContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
