import React, {useContext} from 'react';
import classes from './cart.module.css';
import { ProductContext } from '../../context/Shopcontextapi';

const CartItems = ({ name, price, image, sku }) => {
    const {cartItems, addItems, removeItems} = useContext(ProductContext)
    return (
        <div className={classes.items}>
            <img src={image} alt={`${name}-img`} />
            <div className={classes.props}>
                <b>{name}</b>
                <p>${price}</p>
                <div className={classes.count}>
                    <button onClick={() => removeItems(sku)}>-</button>
                    <input
                        value={cartItems[sku]}
                    />
                    <button onClick={() => addItems(sku)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems
