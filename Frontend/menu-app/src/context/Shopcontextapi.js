import React, { useState, useEffect, createContext } from 'react';

export const ProductContext = createContext();

const Shopcontextapi = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Fetching products data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const dataSet = await response.json();
        setData(dataSet.result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Getting products initial values
  const getProductValue = () => {
    const initialValues = {};
    data.forEach((product) => {
      initialValues[product.sku] = 0;
    });
    return initialValues;
  };

  // Initialize cart items state with initial values
  const [cartItems, setItems] = useState(getProductValue);

  // Add item to cart
  const addItems = (sku) => {
    setItems((prev) => ({
      ...prev,
      [sku]: (prev[sku] || 0) + 1, // Initialize with 0 if not already set
    }));
  };

  // Remove item from cart
  const removeItems = (sku) => {
    setItems((prev) => ({
      ...prev,
      [sku]: (prev[sku] || 0) - 1, // Initialize with 0 if not already set
    }));
  };
// getting total price
  const getTotalPrice = () => {
    return data.reduce((total, product) => {
      const quantity = cartItems[product.sku] || 0;
      return total + (product.price * quantity);
    }, 0);
  };
  // console.log(getTotalPrice())

  // getting the Total products
  const getTotalProducts = () => {
    return Object.values(cartItems).reduce((total, num) => total + num, 0);
  };


  console.log(cartItems);

  return (
    <ProductContext.Provider value={{ 
      data,
      error,
      cartItems, 
      addItems,
      removeItems,
      getTotalPrice,
      getTotalProducts,
      
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default Shopcontextapi;
