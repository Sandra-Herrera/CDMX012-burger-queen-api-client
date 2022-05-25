import { useState } from "react";
import styles from "./popup.module.css";


export function Popup(props) {

    const initialStateValues = {
        product: '',
        cost:'',
        Category:'',
    };

    const [values, setValues] = useState(initialStateValues);
    
    const areaEditChange = e =>{
        const {id, value} = e.target;
        let today = new Date().toISOString()
        const newValue = {...values, [id]: value, "date":today};
        setValues(newValue);
    }


    const saveProduct =product => async (e) => {
        e.preventDefault();
        let docRef;
        if(product && product.id){
            // const upDoc = doc(db, "note", product.id);
            // docRef = await updateDoc(upDoc, values);
            // props.onClickCloseModal();
        }else{
            // docRef = await addDoc(collection(db, "note"),values);
            // setValues({...values, noteId:docRef.id});
            // props.onClickCloseModal();
        }  
    }

    return(
        props.visible ?
        <>
            {/* <!-- The Modal --> */}
            <div id="myModal" className={styles.modal}>

                {/* <!-- Modal content --> */}
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={props.onClickCloseModal}>&times;</span>
                    <input className={styles.titleModal} id="title" onChange={areaEditChange} placeholder="Product Name" defaultValue={props.attrNote?.title}></input>
                    <input className={styles.titleModal} id="title" onChange={areaEditChange} placeholder="Price" defaultValue={props.attrNote?.title}></input>
                    <input className={styles.titleModal} id="title" onChange={areaEditChange} placeholder="Category" defaultValue={props.attrNote?.title}></input>
                    {/* <textarea className={styles.writeNoteModal} id="noteText" onChange={areaEditChange} placeholder="Escribe una nota..." defaultValue={props.attrNote?.noteText}></textarea> */}
                    <section className={styles.reaSaveButton}>
                        <button className={styles.saveEditButton} onClick={saveProduct(props.attrNote)} > 
                            Save
                        </button>
                    </section>
                </div>
            </div>
        </>
        : null
    );
}