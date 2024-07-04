import React, { useState } from 'react';
import classes from './addproduct.module.css';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../API/api';
import { toast } from 'react-toastify';

const Addproduct = () => {
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    numberOfProductsAvailable: '',
    sku: '',
    images: [],
  });
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setImages(Array.from(files));
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const base64Images = await Promise.all(images.map(convertToBase64));

    const formData = {
      ...data,
      images: base64Images,
    };

    console.log('Form data', formData);

    try {
      await createProduct(formData);
      toast.success('Product added successfully');
      navigate('/addproduct');
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                name='name'
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label>Description<span>*</span></label>
              <input
                type='text'
                name='description'
                value={data.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label>Price<span>*</span></label>
              <input
                type='number'
                name='price'
                value={data.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label>Number of Products Available<span>*</span></label>
              <input
                type='number'
                name='numberOfProductsAvailable'
                value={data.numberOfProductsAvailable}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label>Image<span>*</span></label>
              <input
                type='file'
                name='images'
                multiple
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label>SKU<span>*</span></label>
              <input
                type='text'
                name='sku'
                value={data.sku}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.apibtn}>
              <button type='submit'>Add Product</button>
              <button type='button' onClick={() => navigate('/removeproduct')}>
                Remove Product
              </button>
            </div>
          </form>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Addproduct;
