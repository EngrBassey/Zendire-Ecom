import React, { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './StripePayment.module.css';
import Footer from '../../components/Footer/Footer';
import { ProductContext } from '../../context/Shopcontextapi';

// Load your Stripe publishable key
const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Payment successful!');
            // Process paymentMethod.id with your backend
        }
    };

    const { getTotalPrice } =useContext(ProductContext);

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.stripeForm}>
                <div className={styles.formGroup}>
                    <label>Card Details</label>
                    <CardElement className={styles.cardElement} />
                </div>
                <div className={styles.amount}>
                    <label>Debit Amount: ${getTotalPrice().toFixed(2)}</label>
                </div>
                <button type="submit" disabled={!stripe} className={styles.submitButton}>
                    Pay
                </button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
};

const StripePayment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
            <Footer />
        </div>
    );
};

export default StripePayment;