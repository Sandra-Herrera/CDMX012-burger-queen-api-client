import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../database/UserProvider";
import styles from "./products.module.css";
import imgRestaurant from "../../img/imgRestaurant.png";
import logOutIcon from "../../img/logOutIcon.png";
import imgDelete from "../../img/imgDelete.png";
import imgEdit from "../../img/imgEdit.png";
import addIcon from "../../img/addIcon.png";


const NewOrder = () => {
    const [newOrder,setNewOrder] = useState([]);  
    const { logOut } = useContext(UserContext);
      const navigate = useNavigate();
  
      const handleClickLogout = async () => {
          try {
            await logOut();
            navigate("/");
          } catch (error) {
            console.log(error);
          }
        };

        const getAllProduct = () =>{
            fetch('http://localhost:3004/Products')
            .then(response => response.json())
            .then(products => setNewOrder(products));
          }

        useEffect(()=>{
            getAllProduct();
          },[]);
    
          const deleteProducts = (product) =>{
            fetch(`http://localhost:3004/Products/${product.id}`,{
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(deletedProduct => {
                    console.log(deletedProduct)
                    getAllProduct();
                });
          }

        return (
            <>
              <div className={styles.headerImg}>
                <img alt="imagen header" className={styles.imgRest} src={imgRestaurant} />
                <button className={styles.logOutButton} onClick={handleClickLogout}>Log Out 
                <img alt="imageLogOut" className={styles.iconLogOut} src={logOutIcon} />
                </button>
              </div>
              <section>
            <div className={styles.newOrderSection}>
              <div>
                <div className={styles.titleNewOrder}>NEW ORDER 
                {/* <button className={styles.addButton} onClick={onAdd}>
                  Add
                  <img alt="imageAddButton" className={styles.iconAdd} src={addIcon} />
                 </button> */}
                </div>
              </div>
              <div className={styles.inputsOrder}>
                <input className={styles.nameCustomer}>Name</input>
                <input className={styles.numTable}>Table number</input>
              </div>
    
               {newOrder.map((product) => {
                return (
                  <div key={product.id} className={styles.containerItems}>
                      <div  className={styles.itemAlignStart}>{product.name}</div>
                      <div  className={styles.itemTable}>{product.price}</div>
                      <div  className={styles.itemTable}>{product.category}</div>
                      <div  className={styles.itemTable}>
                      {/* <button className={styles.btnEditAndDelete}>
                      <img alt="imgEdit" className={styles.imgEdit} src={imgEdit} onClick={() => editProducts(product)}></img>
                      </button> */}
                      </div>
                      <div  className={styles.itemTable}>
                      <button className={styles.btnEditAndDelete} onClick={() => deleteProducts(product)}>
                        <img alt="imgDelete" className={styles.imgDelete} src={imgDelete}></img>
                      </button>
                      </div>
                  </div>
                );
              })}
            </div>
          </section>
            </>
          );
        };
        
        export default NewOrder;