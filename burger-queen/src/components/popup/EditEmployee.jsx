import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./popup.module.css";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

export const EditEmployee = (props) => {
  const { attrProduct, onClickCloseModal, visible } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("email", attrProduct?.email);
    setValue("name", attrProduct?.name);
    setValue("role", attrProduct?.role);
  }, [attrProduct]);

  const onSubmit = async (data) => {
    saveDataEmployee({
      ...attrProduct,
      email: data.email,
      name: data.name,
      role: data.role,
    });
  };

  const saveDataEmployee = (employee) => {
    if (employee && employee.id) {
      // Hacer PUT
      fetch(`http://localhost:3004/team/${employee.id}`, {
        //actualizar todos y cada uno de los elementos
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(employee),
      })
        .then((response) => response.json())
        .then((addedEmployee) => {
          console.log(addedEmployee);
          onClickCloseModal();
        });
    }
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Employee saved',
      showConfirmButton: false,
      timer: 1500
    })
  };

  return visible ? (
    <>
      <div id="myModal" className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={onClickCloseModal}>
            &times;
          </span>
          <section className={styles.titleModal}>Employee</section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className={styles.AllInputs}>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="email"
                  placeholder="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value:
                        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                      message: "Wrong email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className={styles.errorMessage}>{errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  type={"text"}
                  className={styles.inputModal}
                  id="name"
                  placeholder="Full name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    validate: {
                      trim: (v) => {
                        if (!v.trim())
                          return "Enter letters, characters or numbers";
                        return true;
                      },
                    },
                  })}
                />
                {errors.name && (
                  <p className={styles.errorMessage}>{errors.name.message}</p>
                )}
              </div>
              <div>
                <select
                  className={styles.selectModal}
                  id="role"
                  {...register("role", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                >
                  <option value="">Choose a role</option>
                  <option value="waiter">Waiter</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="administrator">Administrator</option>
                </select>
                {errors.role && (
                  <p className={styles.errorMessage}>{errors.role.message}</p>
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
};
// }

EditEmployee.propTypes = {
  attrProduct: PropTypes.object,
  onClickCloseModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
