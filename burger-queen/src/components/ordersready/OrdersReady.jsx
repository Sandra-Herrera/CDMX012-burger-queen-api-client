import React, { useState, useEffect } from "react";
import styles from "./ordersReady.module.css";
import { useNavigate } from "react-router-dom";
import imgHeaderInto from "../../img/imgHeaderInto.png";
import backIcon from "../../img/backIcon.png";
import headerMediaQ from "../../img/headerMediaQ.jpg";

const OrdersReady = () => {
  const navigate = useNavigate();
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [check, setCheck] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    if (isDelivered) {
      setTimeout(() => {
        getAllProduct();
        setIsDelivered(false);
      }, 3000);
    }
  }, [isDelivered]);

  const getAllProduct = () => {
    fetch("http://localhost:3004/chosenProduct")
      .then((response) => response.json())
      .then((deliveredOrders) => {
        let filteredDeliveryOrders = deliveredOrders.filter(
          (deliveryOrder) =>
            deliveryOrder.dateDone !== "" && !deliveryOrder.delivered
        );
        setDeliveredOrders(filteredDeliveryOrders);
        setCheck(filteredDeliveryOrders.map(() => false));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleChange = (position, chosenProd) => async () => {
    const updatedCheckedState = check.map((item, index) => {
      return index === position ? !item : item;
    });
    setCheck(updatedCheckedState);
    saveDelivery(chosenProd);
  };

  const saveDelivery = (chosenProd) => {
    fetch(`http://localhost:3004/chosenProduct/${chosenProd.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        delivered: true,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsDelivered(true);
        console.log(data);
      });
  };

  const redirectHome = () => {
    navigate("/home");
  };

  const redirectNewOrder = () => {
    navigate("/order");
  };

  return (
    <>
      <div className={styles.headerImg}>
        <picture>
          <source
            className={styles.imgRest}
            srcSet={imgHeaderInto}
            media="(min-width: 415px)"
            alt="imagen header"
          />
          <img
            className={styles.imgRest}
            src={headerMediaQ}
            alt="imagen header"
          />
        </picture>
        <button className={styles.backButton} onClick={redirectHome}>
          <img alt="iconBack" className={styles.imgBack} src={backIcon} />
        </button>
        <button className={styles.btnNewOrder} onClick={redirectNewOrder}>
          New order
        </button>
      </div>

      <section>
        <div className={styles.productsTable}>
          <div>
            <div className={styles.titleTable}>ORDERS READY</div>
          </div>
          <div className={styles.mainHeaderTable}>
            <div className={styles.headerTable}>Product</div>
            <div className={styles.headerTable}>Quantity</div>
            <div className={styles.headerTable}>Table</div>
            <div className={styles.headerTable}>Delivered</div>
          </div>
          <div className={styles.scrollKitchen}>
            {deliveredOrders.map((chosenProd, index) => {
              return (
                <div
                  key={chosenProd.id}
                  className={`${styles.containerItems}  ${
                    check[index] ? styles.fadeOut : ""
                  }`}
                >
                  <div className={styles.itemAlignStart}>
                    {chosenProd.product}
                  </div>
                  <div className={styles.itemTable}>{chosenProd.qty}</div>
                  <div className={styles.itemTable}>{chosenProd.table}</div>
                  <div className={styles.itemTable}>
                    <input
                      type="checkbox"
                      value="check"
                      onChange={handleChange(index, chosenProd)}
                      checked={check[index]}
                      className={styles.checkbox}
                      disabled={check[index]}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrdersReady;
