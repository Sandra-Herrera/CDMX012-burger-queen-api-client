import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./editEmployee.module.css";

export const EditEmployee = (props) => {
  const { attrProduct } = props;
  const [inputsModal, setInputsModal] = useState(attrProduct);

  useEffect(() => {
    setInputsModal(attrProduct);
  }, [attrProduct]);

  const areaEditChange = (e) => {
    const { id, value } = e.target;
    const newValue = { ...inputsModal, [id]: value };
    setInputsModal(newValue);
  };

  const saveDataEmployee = (employee) => async (e) => {
    e.preventDefault();
    if (employee && employee.id) {
      // Hacer PUT
      fetch(`http://localhost:3004/Team/${employee.id}`, {
        //actualizar todos y cada uno de los elementos
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(inputsModal),
      })
        .then((response) => response.json())
        .then((addedEmployee) => {
          console.log(addedEmployee);
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
          <section className={styles.titleModal}>Employee</section>
          <section className={styles.AllInputs}>
            <input
              className={styles.inputModal}
              id="email"
              onChange={areaEditChange}
              placeholder="email"
              defaultValue={props.attrProduct?.email}
            ></input>
            <input
              className={styles.inputModal}
              id="name"
              onChange={areaEditChange}
              placeholder="Full name"
              defaultValue={props.attrProduct?.name}
            ></input>
            <select
              className={styles.selectModal}
              id="role"
              onChange={areaEditChange}
              defaultValue={props.attrProduct?.role}
            >
              <option value="">Choose a role</option>
              <option value="waiter">Waiter</option>
              <option value="kitchen">Kitchen</option>
              <option value="administrator">Administrator</option>
            </select>
          </section>
          <section className={styles.areaSaveButton}>
            <button
              className={styles.saveEditButton}
              onClick={saveDataEmployee(props.attrProduct)}
            >
              Save
            </button>
          </section>
        </div>
      </div>
    </>
  ) : null;
};

EditEmployee.propTypes = {
  attrProduct: PropTypes.object,
  onClickCloseModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
