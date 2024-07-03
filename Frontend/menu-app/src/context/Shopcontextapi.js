import React, { useState, useEffect, createContext } from 'react';
import { cart, getCart } from '../API/api';

export const ProductContext = createContext();


const Shopcontextapi = ({children}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // for products data fetching
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

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartData = await getCart();
        const cartItems = cartData.result.cartItems.reduce((acc, item) => {
          acc[item.product] = item.quantity;
          return acc;
        }, {});
        setItems(cartItems);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Getting products initial values
  const getProductValue = () => {
    const initialValues = {};
    data.forEach((product) => {
      initialValues[product.sku] = 0;
    });
    return initialValues;
  };

  // console.log(getProductValue())
// add items to cart
const [cartItems, setItems] = useState(getProductValue());

  // Add item to cart
  const addItems = async(sku) => {
    setItems((prev) => ({
      ...prev,
      [sku]: (prev[sku] || 0) + 1,
    }));
    const response = await cart(sku, 1);
        if (response.success) {
            console.log("Backend Res:", response);

        }
        console.log(response)
  };

// add items to cart
const removeItems = (sku) => {
    setItems((prev) => ({
      ...prev,
      [sku]: (prev[sku] || 0) - 1,
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
   const getTotalProducts = async (cartItems) => {
    if (Object.keys(cartItems).length > 0) {
      return Object.values(cartItems).reduce((total, num) => total + num, 0);
    } else {
      try {
        const data = await getCart();
          console.log("Cart", data.result.cartItems);
        if (data && data.result.cartItems) {
            return data.result.cartItems.reduce((total, item) => total + item.quantity, 0);
        } else {
          return 0;
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        return 0; // or handle error accordingly
      }
    }
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
