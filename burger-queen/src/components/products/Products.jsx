// import React, { useContext, useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../database/UserProvider";
import styles from "./products.module.css";
import imgRestaurant from "../../img/imgRestaurant.png";
// import logOutIcon from "../../img/logOutIcon.png";
import imgDelete from "../../img/imgDelete.png";
import imgEdit from "../../img/imgEdit.png";
import addIcon from "../../img/addIcon.png";
import backIcon from "../../img/backIcon.png";
import { Popup } from "../popup/Popup";


const Products = () => {
  const [products,setProducts] = useState([]);  
  // const { logOut } = useContext(UserContext);
    const navigate = useNavigate();

    // const handleClickLogout = async () => {
    //     try {
    //       await logOut();
    //       console.log('cerró sesión');
    //       navigate("/");
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

      const getAllProduct = () =>{
        fetch('http://localhost:3004/Products')
        .then(response => response.json())
        .then(products => setProducts(products));
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

      const [objPopup, setPopup] = useState({visibility:false});

      const editProducts = (popupProduct) =>{
        setPopup({visibility:true, popupProduct})
      }

      const onAdd  = () =>{
        setPopup({visibility:true});
      }
      const onClickHide = ()=> {
        getAllProduct();
        setPopup({visibility:false});
      }

      const redirectHome = () => {
        navigate("/home");
      };

      return (
        <>
          <Popup onClickCloseModal={onClickHide} visible={objPopup.visibility} attrProduct={objPopup.popupProduct}></Popup>
          <div className={styles.headerImg}>
            <img alt="imagen header" className={styles.imgRest} src={imgRestaurant} /> 

            <button className={styles.backButton} onClick={redirectHome}>
          <img
            alt="iconBack"
            className={styles.imgBack}
            src={backIcon}
          />
        </button>

        {/* <button className={styles.addButton} onClick={onAdd}>
              Add
              <img alt="imageAddButton" className={styles.iconAdd} src={addIcon} />
            </button> */}

            {/* <button className={styles.logOutButton} onClick={handleClickLogout}>Log Out 
            <img alt="imageLogOut" className={styles.iconLogOut} src={logOutIcon} />
            </button> */}
          </div>
          <section>
        <div className={styles.productsTable}>
          {/* <section className={styles.x}> */}
          <div>
            <div className={styles.titleTable}>PRODUCTS 
            <button className={styles.addButton} onClick={onAdd}>
              Add
              <img alt="imageAddButton" className={styles.iconAdd} src={addIcon} />
            </button>
          </div>
          </div>
          <div className={styles.mainHeaderTable}>
            <div className={styles.headerTable}>Name</div>
            <div className={styles.headerTable}>Price</div>
            <div className={styles.headerTable}>Category</div>
            <div className={styles.headerTable}>Edit</div>
            <div className={styles.headerTable}>Delete</div>
          </div>
          {/* </section> */}

{/* <section> */}
           {products.map((product) => {
            return (
              <div key={product.id} className={styles.containerItems}>
                  <div  className={styles.itemAlignStart}>{product.name}</div>
                  <div  className={styles.itemTable}>{product.price}</div>
                  <div  className={styles.itemTable}>{product.category}</div>
                  <div  className={styles.itemTable}>
                  <button className={styles.btnEditAndDelete}>
                  <img alt="imgEdit" className={styles.imgEdit} src={imgEdit} onClick={() => editProducts(product)}></img>
                  </button>
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
        {/* </section> */}
      </section>
        </>
      );
    };
    
    export default Products;
