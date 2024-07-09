import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import classes from './productdescription.module.css';
// import { ProductContext } from '../../context/Shopcontextapi';
import { toast } from 'react-toastify';
import { FaCartShopping } from "react-icons/fa6";
import { ProductContext } from '../context/Shopcontextapi';
import Footer from '../components/Footer/Footer';

const ProductDescription = () => {
    const { sku } = useParams();
    const { cartItems, data, addItems, removeItems } = useContext(ProductContext);

    const product = data.find(item => item.sku === sku);

    const handleAddToCart = () => {
        addItems(product.sku);
        toast.success('Product added to cart!');
    };

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className={classes.productDescription}>
            <div className={classes.container}>
                <div className={classes.box2}>
                    <img src={`http://localhost:5000/${product.images[0]}`} alt={`${product.name}-img`} />
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <div className={classes.btn}>
                        <button onClick={handleAddToCart}>
                            <FaCartShopping /> Add to Cart
                        </button>
                        <div className={classes.count}>
                            <button onClick={() => removeItems(sku)}>-</button>
                            <input
                                value={cartItems[sku]}
                            />
                            <button onClick={() => addItems(sku)}>+</button>
                        </div>
                    </div>
                </div>
                <div className={classes.box2}>
                    <p>
                        *Note: You can add this product to your cart or increase the quantity directly from this page.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDescription;
