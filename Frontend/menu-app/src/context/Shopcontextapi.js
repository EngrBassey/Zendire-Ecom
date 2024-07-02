import React, {useState, useEffect, createContext} from 'react';


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
  // console.log(data.images);
  //getting products inital values
  
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

const addItems = (sku) => {
    setItems((prev) => ({
      ...prev,
      [sku]: (prev[sku] || 0) + 1, 
    }));
};

// add items to cart
const removeItems = (sku) => {
    setItems((prev) => ({
      ...prev,
      [sku]: (prev[sku] || 0) - 1, 
    }));
};
// console.log(cartItems);

  return (
    <ProductContext.Provider value={{data, error, cartItems, addItems, removeItems}}>{children}</ProductContext.Provider>
  )
}

export default Shopcontextapi;
