import React, { useState, useEffect } from "react";
import styles from "./products.module.css";
import imgDelete from "../../img/imgDelete.png";
import imgEdit from "../../img/imgEdit.png";
import addIcon from "../../img/addIcon.png";
import { Popup } from "../popup/Popup";
import Header from "../header/Header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDeletedProduct, setIdDeletedProduct] = useState("");

  const getAllProduct = () => {
    fetch("http://localhost:3004/Products")
      .then((response) => response.json())
      .then((products) => setProducts(products));
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const deleteProducts = (product) => {
    fetch(`http://localhost:3004/Products/${product.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedProduct) => {
        console.log(deletedProduct);
        getAllProduct();
      });
    toggleModalDelete();
  };

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const deleteMeal = (id) => {
    setIdDeletedProduct(id);
    toggleModalDelete();
  };

  const [objPopup, setPopup] = useState({ visibility: false });

  const editProducts = (popupProduct) => {
    setPopup({ visibility: true, popupProduct });
  };

  const onAdd = () => {
    let popupProduct={};
    setPopup({ visibility: true, popupProduct });
  };
  const onClickHide = () => {
    getAllProduct();
    setPopup({ visibility: false });
  };

  return (
    <>
      <Popup
        onClickCloseModal={onClickHide}
        visible={objPopup.visibility}
        attrProduct={objPopup.popupProduct}
      ></Popup>

      <Header />

      <section>
        <div className={styles.productsTable}>
          <div>
            <div className={styles.titleTable}>
              PRODUCTS
              <button className={styles.addButton} onClick={onAdd}>
                <img
                  alt="imageAddButton"
                  className={styles.iconAdd}
                  src={addIcon}
                />
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
          <div className={styles.scrollProduct}>
            {products.map((product) => {
              return (
                <div key={product.id} className={styles.containerItems}>
                  <div className={styles.itemAlignStart}>{product.name}</div>
                  <div className={styles.itemTable}>{product.price}</div>
                  <div className={styles.itemTable}>{product.category}</div>
                  <div className={styles.itemTable}>
                    <button className={styles.btnEditAndDelete}>
                      <img
                        alt="imgEdit"
                        className={styles.imgEdit}
                        src={imgEdit}
                        onClick={() => editProducts(product)}
                      ></img>
                    </button>
                  </div>
                  <div className={styles.itemTable}>
                    <button
                      className={styles.btnEditAndDelete}
                      onClick={() => deleteMeal(product)}
                    >
                      <img
                        alt="imgDelete"
                        className={styles.imgDelete}
                        src={imgDelete}
                      ></img>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {modalDelete && (
        <section className={styles.modalDelete}>
          <section className={styles.overlayDelete}></section>
          <section className={styles.modalContentDelete}>
            <h2 className={styles.deleteOrCancel}>
              Are you sure you want to delete this product?
            </h2>
            <section className={styles.deleteAndCancel}>
              <button
                className={styles.deleteYes}
                onClick={() => deleteProducts(idDeletedProduct)}
              >
                Delete
              </button>
              <button
                type="submit"
                className={styles.cancel}
                onClick={toggleModalDelete}
              >
                Cancel
              </button>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default Products;