import React, { useState } from "react";
import PropTypes from "prop-types";

const OrderContext = React.createContext();

export const OrderContextProvider = (props) => {
  const [order, setOrder] = useState([]);

  const sendContextOrder = (meals) => {
    setOrder(meals);
  };

  return (
    <OrderContext.Provider value={{ order, sendContextOrder }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContext;

OrderContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
