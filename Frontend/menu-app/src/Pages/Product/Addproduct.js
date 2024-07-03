// import React, { useState } from 'react';
import classes from './addproduct.module.css';
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {

    // const [name, setName] = useState('');
    // const [price, setPrice] = useState('');
    // const [image, setImage] = useState(null);
    // const [sku, setSku] = useState('');
    // const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <div className={classes.addproduct}>
                <ul>
                    <h1>Add New Product</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.formGroup}>
                            <label>Product Name<span>*</span></label>
                            <input
                                type='text'
                                required
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <label>Price<span>*</span></label>
                            <input
                                type='number'
                                required
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <label>Image<span>*</span></label>
                            <input
                                type='file'
                                required
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <label>SKU<span>*</span></label>
                            <input
                                type='text'
                                required
                            />
                        </div>
                        <div className={classes.apibtn}>
                            <button type='submit'>Add Product</button>
                            <button 
                                type='submit' 
                                onClick={() => navigate('/removeproduct')

                                }>
                                    Remove Product
                            </button>
                        </div>
                    </form>
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default Addproduct
