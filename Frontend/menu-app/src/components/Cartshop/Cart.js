import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/Shopcontextapi';
import classes from './cart.module.css'

const Cart = () => {
  const { cartItems, data, getTotalPrice, getTotalProducts } = useContext(ProductContext);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchTotalProducts = async () => {
      const total = await getTotalProducts(cartItems);
      setTotalProducts(total);
    };
    fetchTotalProducts();
  }, [cartItems]);

  return (
    <div className={classes.cart}>
      {totalProducts > 0 ? (
        <>
          <h1>My Cart items</h1>
          <div className={classes.additems}>
            <div>
              {data.map((item, i) => {
                if (cartItems[item.sku]) {
                  return (
                    <CartItems
                      key={item.sku}
                      name={item.name}
                      price={item.price}
                      image={`http://localhost:5000${item.images[0]}`}
                      sku={item.sku}
                    />
                  );
                }
                return null;
              })}
            </div>
            <div className={classes.checkout}>
              <h1>Total products: {totalProducts}</h1>
              <p>Price: ${getTotalPrice().toFixed(2)}</p>
              <button onClick={() => navigate('/checkout')}>Checkout</button>
            </div>
          </div>
          <div className={classes.shopping}>
            <button onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        </>
      ) : (
        <>
          <h1>Your cart is empty</h1>
          <div className={classes.shopping}>
            <button onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        </>
      )}
      <Footer />
    </div>
  )
}

export default Cart
