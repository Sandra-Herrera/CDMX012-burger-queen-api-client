import React from "react";
import styles from "./viewMenuNewOrder.module.css";
import { OrderContextProvider } from "../context/OrderContext";
import Menu from "./Menu";
import NewOrder from "./NewOrder";
import Header from "../header/Header";

const ViewMenuNewOrder = () => {
  return (
    <>
      <Header />

      <OrderContextProvider>
        <section className={styles.containerViewMenuNewOrder}>
          <Menu />
          <NewOrder />
        </section>
      </OrderContextProvider>
    </>
  );
};

export default ViewMenuNewOrder;
