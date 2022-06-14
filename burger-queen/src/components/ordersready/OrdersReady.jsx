import React, { useState, useEffect } from "react";
import styles from "./ordersReady.module.css";
import Header from "../header/Header";

const OrdersReady = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [check, setCheck] = useState(false);
  //const { logOut } = useContext(UserContext);

  // const handleClickLogout = async () => {
  //   try {
  //     await logOut();
  //     console.log("cerró sesión");
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllProduct = () => {
    fetch("http://localhost:3004/chosenProduct")
      .then((response) => response.json())
      .then((deliveredOrders) => {
        
        let filteredDeliveryOrders = deliveredOrders.filter((deliveryOrder)=>deliveryOrder.dateDone !== "");
        setDeliveredOrders(filteredDeliveryOrders);



        // let checkStates = deliveredOrders.map((choseProd) => {
        //   if (choseProd.dateDone !== "") {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // });
        // console.log(checkStates);
        // setCheck(checkStates);

        
      })
      .catch((error) => console.log(error));
    }

      useEffect(() => {
        getAllProduct();
      }, []);

      const handleChange = (position) => async () => {
        const updatedCheckedState = check.map((item, index) => {
          return index === position ? !item : item;
        });
        console.log(updatedCheckedState);
        setCheck(updatedCheckedState);
      };

  return (
    <>
      <Header />

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
                <div key={chosenProd.id} className={styles.containerItems}>
                  <div className={styles.itemAlignStart}>
                    {chosenProd.product}
                  </div>
                  <div className={styles.itemTable}>{chosenProd.qty}</div>
                  <div className={styles.itemTable}>{chosenProd.table}</div>
                  {/* <div className={styles.itemTable}>
                    {
                      <Chronometer
                        timeFromChosenProd={{
                          ms: chosenProd?.time?.ms,
                          s: chosenProd?.time?.s,
                          m: chosenProd?.time?.m,
                          h: chosenProd?.time?.h,
                        }}
                        isStopped={check[index]}
                        saveDate={saveDate}
                        chosenProd={chosenProd}
                      />
                    }
                  </div> */}
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
