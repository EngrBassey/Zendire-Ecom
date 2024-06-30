import React from 'react';
import productData from '../ProdctData/productData';
import classes from './shoplist.module.css'
import { FaCartShopping } from "react-icons/fa6";

const Shoplist = (props) => {
    return (
        <div className={classes.shopBox}>
            {productData.map((categories, indx) => (
                <div key={indx}>
                    <ul >
                        {
                            categories.Type.map((item, i) => (
                                <div className={classes.items}>
                                    <img src={item.image} className={classes.shopImag} alt={`${item.name}-img`} />
                                    <h5>{item.name}</h5>
                                    <h4>{categories.Categories}</h4>
                                    <div className={classes.cartbtn}>
                                        <hr/>
                                        <button><FaCartShopping /></button>
                                    </div>
                                    <p>${item.price}</p>
                                </div>
                            ))
                        }
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Shoplist
