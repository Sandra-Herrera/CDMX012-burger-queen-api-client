import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../database/UserProvider";
import styles from "./products.module.css";
import imgRestaurant from "../../img/imgRestaurant.png";
import logOutIcon from "../../img/logOutIcon.png";

const Products = () => {
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    try {
      await logOut();
      console.log("cerró sesión");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3004/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <div className={styles.headerImg}>
        <img
          alt="imagen header"
          className={styles.imgRest}
          src={imgRestaurant}
        />
        <button className={styles.logOutButton} onClick={handleClickLogout}>
          Log Out
          <img
            alt="imageLogOut"
            className={styles.iconLogOut}
            src={logOutIcon}
          />
        </button>
      </div>
      <section>
        <div className={styles.productsTable}>
          <div className={styles.titleTable}>PRODUCTS</div>
          <div className={styles.headerTable}>Nombre</div>
          <div className={styles.headerTable}>Costo</div>
          <div className={styles.headerTable}>Categoria</div>
          <div className={styles.headerTable}>Editar</div>
          <div className={styles.headerTable}>Borrar</div>
          {products.map((product) => {
            return (
              <>
                  <div  className={styles.itemTable}>{product.name}</div>
                  <div  className={styles.itemTable}>{product.cost}</div>
                  <div  className={styles.itemTable}>{product.category}</div>
                  <div  className={styles.itemTable}>10</div>
                  <div  className={styles.itemTable}>11</div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Products;
