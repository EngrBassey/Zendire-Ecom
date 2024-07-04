import React, { useState } from 'react';
import classes from './addproduct.module.css';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../API/api';
import { toast } from 'react-toastify';

const Removeproduct = () => {
  const [sku, setSku] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteProduct(sku);
      toast.success('Product removed successfully');
      navigate('/removeproduct');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.addproduct}>
        <ul>
          <h1>Remove Product</h1>
          <form onSubmit={handleSubmit}>
            <div className={classes.formGroup}>
              <label>SKU<span>*</span></label>
              <input
                type='text'
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
              />
            </div>
            <div className={classes.apibtn}>
              <button type='submit'>Remove Product</button>
              <button type='button' onClick={() => navigate('/addproduct')}>Add Product</button>
            </div>
          </form>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Removeproduct;
