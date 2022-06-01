import React, {  useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../database/UserProvider";
import styles from "./newOrder.module.css";
// import imgRestaurant from "../../img/imgRestaurant.png";
// import logOutIcon from "../../img/logOutIcon.png";
import imgDelete from "../../img/imgDelete.png";
import imgMinus from "../../img/imgMinus.png";
import imgPlus from "../../img/imgPlus.png";

const NewOrder = () => {
  const [newOrder, setNewOrder] = useState([]);
  // const { logOut } = useContext(UserContext);
  // const navigate = useNavigate();

  // const handleClickLogout = async () => {
  //   try {
  //     await logOut();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllProduct = () => {
    fetch("http://localhost:3004/Products")
      .then((response) => response.json())
      .then((products) => setNewOrder(products));
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const minusProducts = () => {

  }

  const plusProducts = () => {

  }

  const deleteProducts = (product) => {
    return product //quitarlo
    // fetch(`http://localhost:3004/Products/${product.id}`, {
    //   method: "DELETE",
    // })
    //   .then((response) => response.json())
    //   .then((deletedProduct) => {
    //     console.log(deletedProduct);
    //     getAllProduct();
    //   });
  };

  return (
    <>
      <section className={styles.containerNewOrder}>
        <div className={styles.newOrderSection}>
          <div>
            <div className={styles.titleNewOrder}>
              NEW ORDER
              {/* <button className={styles.addButton} onClick={onAdd}>
                  Add
                  <img alt="imageAddButton" className={styles.iconAdd} src={addIcon} />
                 </button> */}
            </div>
          </div>
          <div className={styles.inputsOrder}>
            <p>
              Customer name<input className={styles.nameCustomer}></input>
            </p>
            <p>
              Table number<input className={styles.numTable}></input>
            </p>
          </div>
          <section className={styles.containerOrder}>
            {newOrder.map((product) => {
              return (
                <div key={product.id} className={styles.productRow}>
                  <div className={styles.itemAlignStart}>{product.name}</div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnIcons} onClick={() => minusProducts(product)}>
                      <img alt="iconMinus" className={styles.imgIcon} src={imgMinus}></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <input className={styles.inputCounter} type= "text" />
                  </div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnIcons} onClick={() => plusProducts(product)}>
                      <img alt="iconPlus" className={styles.imgIcon} src={imgPlus}></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnIcons} onClick={() => deleteProducts(product)}>
                      <img alt="iconDelete" className={styles.imgIcon} src={imgDelete}></img>
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
          <section className={styles.bottonAreabtn}>
            <button className={styles.bottonButtons}>Orders</button>
            <button className={styles.bottonButtons}>Send</button>
          </section>
        </div>
       </section>

    </>
  );
};

export default NewOrder;
