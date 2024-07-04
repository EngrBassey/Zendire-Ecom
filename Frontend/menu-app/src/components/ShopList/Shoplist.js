import React, { useContext } from 'react';
import classes from './shoplist.module.css'
import { FaCartShopping } from "react-icons/fa6";
import { ProductContext } from '../../context/Shopcontextapi';
import { toast } from 'react-toastify';

const Shoplist = (props) => {
    const {data, error, addItems} = useContext(ProductContext);
    const handleAddToCart = (sku) => {
        addItems(sku);
        toast.success('Product added to cart!');
      };
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className={classes.shopBox}>
            {
                data.map((item, i) => (

                    <ul key={i}>
                        <div  className={classes.items}>
                            <img src={`http://localhost:5000/${item.images[0]}`} className={classes.shopImag} alt={`${item.name}-img`} />
                            <h5>{item.name}</h5>
                            {/* <h4>{categories.Categories}</h4> */}
                            <div className={classes.cartbtn}>
                                <hr />
                                <button
                                    onClick={() => handleAddToCart(item.sku)}
                                ><FaCartShopping /></button>

                            </div>
                            <p>${item.price}</p>
                        </div>
                    </ul>

                ))
            }
        </div>
    )
}

export default Shoplist
