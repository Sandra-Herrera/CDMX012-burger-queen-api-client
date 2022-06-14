import React, { useEffect } from "react";
import styles from "./popup.module.css";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

Popup.propTypes = {
  attrProduct: PropTypes.object,
  onClickCloseModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export function Popup(props) {
  const { attrProduct } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("productName", attrProduct?.name);
    setValue("price", attrProduct?.price);
    setValue("category", attrProduct?.category);
  }, [attrProduct]);

  // const areaEditChange = (e) => {
  //   const { id, value } = e.target;
  //   const newValue = { ...inputsModal, [id]: value };
  //   setInputsModal(newValue);
  // };

  const onSubmit = async (data) => {
    saveProduct({
      ...attrProduct,
      name: data.productName,
      price: data.price,
      category: data.category,
    });
  };

  const saveProduct = (product) => {
    if (product && product.id) {
      // Hacer PUT
      fetch(`http://localhost:3004/Products/${product.id}`, {
        //actualizar todos y cada uno de los elementos
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((addedProduct) => {
          console.log(addedProduct);
          props.onClickCloseModal();
        });
    } else {
      // Hacer POST
      fetch("http://localhost:3004/Products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((addedProduct) => {
          console.log(addedProduct);
          props.onClickCloseModal();
        });
    }
  };

  return props.visible ? (
    <>
      {/* <!-- The Modal --> */}
      <div id="myModal" className={styles.modal}>
        {/* <!-- Modal content --> */}
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={props.onClickCloseModal}>
            &times;
          </span>
          <section className={styles.titleModal}>Product</section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className={styles.AllInputs}>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="name"
                  placeholder="Product Name"
                  {...register("productName", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                ></input>
                {errors.productName && (
                  <p className={styles.errorMessage}>
                    {errors.productName.message}
                  </p>
                )}
              </div>
              <div>
              <input
                type={"text"}
                className={styles.inputModal}
                id="price"
                placeholder="Price"
                {...register("price", {
                  defaultValue: props.attrProduct?.name,
                  required: {
                    value: true,
                    message: "Required",
                  },
                })}
              ></input>
              {errors.price && (
                <p className={styles.errorMessage}>{errors.price.message}</p>
              )}
              </div>
              <div>
              <select
                className={styles.selectModal}
                id="category"
                {...register("category", {
                  required: {
                    value: true,
                    message: "Required",
                  },
                })}
              >
                <option value="">Category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch/Dinner">Lunch/Dinner</option>
              </select>
              {errors.category && (
                <p className={styles.errorMessage}>{errors.category.message}</p>
              )}
              </div>
            </section>
            <section className={styles.areaSaveButton}>
              <button type="submit" className={styles.saveEditButton}>
                Save
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  ) : null;
}
