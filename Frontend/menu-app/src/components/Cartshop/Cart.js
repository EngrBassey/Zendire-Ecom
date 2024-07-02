import React, {useContext} from 'react';
import { ProductContext } from '../../context/Shopcontextapi';
import classes from './cart.module.css'

const Cart = (props) => {
    const {cartItems, data} = useContext(ProductContext);

  return (
    <div className={classes.cart}>

    </div>
  )
}

export default Cart
