import React,{useState} from "react";
import PropTypes from "prop-types";


const OrderContext = React.createContext();

export const OrderContextProvider = (props) =>{
    const[order, setOrder] = useState([]);

    const sendContextOrder = (meal)=>{
        let _order = order;
        _order.push(meal);
        setOrder(_order);
        console.log(order);
    }
    return(
        <OrderContext.Provider value={{order,sendContextOrder}}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderContext;

OrderContextProvider.propTypes = {
    children: PropTypes.element.isRequired
}
