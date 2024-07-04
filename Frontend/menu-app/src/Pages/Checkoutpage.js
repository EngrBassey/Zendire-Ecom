import React, { useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import classes from './checkoutpage.module.css';
import Footer from '../components/Footer/Footer';
import { ProductContext } from '../context/Shopcontextapi';
import Cartorder from './Cartorder';
import { useNavigate } from 'react-router-dom';
import Payment from './Payment';
import StripePayment from './Payment/Stripe';

const stripePromise = loadStripe('pk_test_51PXlOARuMbncactcOei3uWWUYSeTVEt6Gmwe40o1DuKVYqPTir5sx4y7AKK9kLGV19uABLPXqAWiSYjZSzzJdXcP00Mux0JpHf');

const Checkoutpage = () => {
    const navigate = useNavigate();
    const { cartItems, data, getTotalPrice } = useContext(ProductContext);
    const [shippingDetails, setShippingDetails] = useState({});
    const [cartItems_, setCartItems] = useState({});
    const [amount, setAmount] = useState(0);
    const [orderData, setOrderData] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });


    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const handleOrder = async (e) => {
        e.preventDefault();
        const shippingDets = { ...orderData };
        setShippingDetails(shippingDets);

        const myCartItems = data.reduce((acc, item) => {
            if (cartItems[item.sku]) {
                acc[item.sku] = {
                    product: item._id,
                    sku: item.sku,
                    quantity: cartItems[item.sku],
                    name: item.name,
                    price: item.price,
                    image: `http://localhost:5000${item.images[0]}`,
                };
            }
            return acc;
        }, {});
        setCartItems(myCartItems);
        // console.log(cartItems, "Refined");

        const totalAmount = getTotalPrice().toFixed(2);
        setAmount(totalAmount);
        console.log('Amount is', amount);
        navigate('/pay', { state: { shippingDetails: shippingDets, cartItems: myCartItems, amount: totalAmount } });
    };

    return (
        <form onSubmit={handleOrder}>
        <div className={classes.container}>
            <div className={classes.checkout}>
                <div className={classes.form}>

                        <h1>Billing Details</h1>
                        {/* Form fields for shipping details */}
                        <label>Address<span>*</span></label>
                        <input
                            type='text'
                            name='address'
                            value={orderData.address}
                            onChange={handleChange}
                            required
                        />
                        <div className={classes.nameinput}>
                            <ul>
                                <label>City<span>*</span></label>
                                <input
                                    type='text'
                                    name='city'
                                    value={orderData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </ul>
                            <ul className={classes.lastinput}>
                                <label>Postal Code<span>*</span></label>
                                <input
                                    type='text'
                                    name='postalCode'
                                    value={orderData.postalCode}
                                    onChange={handleChange}
                                    required
                                />
                            </ul>
                        </div>
                        <label>Country</label>
                        <input
                            type='text'
                            name='country'
                            value={orderData.country}
                            onChange={handleChange}
                        />

                </div>

                <div className={classes.orderbox}>
                    <div className={classes.box1}>
                        <h1>Your Order(s)</h1>
                        <div className={classes.supbox}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>PRODUCTS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        if (cartItems[item.sku]) {
                                            return (
                                                <Cartorder
                                                    key={item.sku}
                                                    name={item.name}
                                                    price={item.price}
                                                    quantity={cartItems[item.sku]}
                                                    sku={item.sku}
                                                    image={`http://localhost:5000${item.images[0]}`}
                                                />
                                            );
                                        }
                                        return null;
                                    })}
                                    <tr>
                                        <td><h5>Total </h5></td>
                                        <td><h5>${getTotalPrice().toFixed(2)}</h5></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="submit">PLACE ORDER</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </form>
    );
};

export default Checkoutpage;
