import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import styles from './StripePayment.module.css';
import Footer from '../../components/Footer/Footer';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PXlOARuMbncactcOei3uWWUYSeTVEt6Gmwe40o1DuKVYqPTir5sx4y7AKK9kLGV19uABLPXqAWiSYjZSzzJdXcP00Mux0JpHf');

const StripePayment = () => {
    const location = useLocation();
    const { shippingDetails, cartItems, amount } = location.state || {};
    console.log(shippingDetails, cartItems, amount)

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm shippingDetails={shippingDetails} cartItems={cartItems} amount={amount} />
            </Elements>
            <Footer />
        </div>
    );
};

export default StripePayment;
