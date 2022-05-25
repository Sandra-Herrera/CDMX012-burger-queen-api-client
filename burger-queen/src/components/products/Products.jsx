import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../database/UserProvider";
import styles from "./products.module.css";
import imgRestaurant from "../../img/imgRestaurant.png";
import logOutIcon from "../../img/logOutIcon.png";
import imgDelete from "../../img/imgDelete.png";
import imgEdit from "../../img/imgEdit.png";
import addIcon from "../../img/addIcon.png";


const Products = () => {
  const [products,setProducts] = useState([]);  
  const { logOut } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClickLogout = async () => {
        try {
          await logOut();
          console.log('cerró sesión');
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        fetch('http://localhost:3004/Products')
        .then(response => response.json())
        .then(data => setProducts(data));
      },[]);

      const deleteProducts = (id) =>{
          alert(id)
          // delete products.id
          // const productDelete = products.filter((item) => item.id !== id)
          // setProducts(productDelete)
      }

      const editProducts = (id) =>{
        alert(id)
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
        <div className={styles.productsTable}>
          <div>
            <div className={styles.titleTable}>PRODUCTS 
            <button className={styles.addButton}>Add
            <img alt="imageAddButton" className={styles.iconAdd} src={addIcon} />
            </button>
          </div>
          </div>
          <div className={styles.mainHeaderTable}>
            <div className={styles.headerTable}>Name</div>
            <div className={styles.headerTable}>Cost</div>
            <div className={styles.headerTable}>Category</div>
            {/* <div className={styles.headerTable}>Editar</div>
            <div className={styles.headerTable}>Borrar</div> */}
          </div>

           {products.map((product) => {
            return (
              <div key={product.id} className={styles.containerItems}>
          {/* {console.log(product.id)} */}
                  <div  className={styles.itemAlignStart}>{product.name}</div>
                  <div  className={styles.itemTable}>{product.cost}</div>
                  <div  className={styles.itemTable}>{product.category}</div>
                  <div  className={styles.itemTable}>
                  <button className={styles.btnEditAndDelete} onClick={() => editProducts(product.id)}>
                  <img alt="imgEdit" className={styles.imgEdit} src={imgEdit}></img>
                  </button>
                  </div>
                  <div  className={styles.itemTable}>
                  <button className={styles.btnEditAndDelete} onClick={() => deleteProducts(product.id)}>
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
    
    export default Products;
