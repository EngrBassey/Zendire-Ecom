import React, { createContext } from 'react';
import productData from '../components/ProdctData/productData';
const shopContext = createContext(null);

const getProductLength = () => {
    let productlenght = 0;

    productData.forEach(categories => {
        productData += categories.Type.length;
    })
    return productlenght;
}

const Shopcontextapi = (props) => {
  return (
    <Shopcontextapi.provider>{props.children}</Shopcontextapi.provider>
  )
}

export default Shopcontextapi
