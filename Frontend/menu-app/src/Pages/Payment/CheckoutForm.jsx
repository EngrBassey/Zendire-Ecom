import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './StripePayment.module.css';
import { placeOrder, resetCart } from '../../API/api';

const CheckoutForm = ({ shippingDetails, cartItems, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            console.error('CardElement not found');
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setMessage(error.message);
        } else {
            try {
                const newOrderDetails = {
                    shippingDetails,
                    cart_: cartItems,
                    amount,
                    paymentMethodId: paymentMethod.id,
                };

                const response = await placeOrder(newOrderDetails);
                if (response.success) {
                    const res = await resetCart();
                    if (res.success) {
                        toast.success('Order successful');
                        setTimeout(() => navigate('/order/history'), 3000);
                    }else {setMessage('Failed to reset cart', res); }
                }  else {
                    setMessage('Failed to place order');
                }
            } catch (error) {
                setMessage('Error placing order');
            }
        }
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.stripeForm}>
                <div className={styles.formGroup}>
                    <label>Card Details</label>
                    <CardElement className={styles.cardElement} />
                </div>
                <div className={styles.amount}>
                    <label>Debit Amount: {amount}</label>
                </div>
                <button type="submit" disabled={!stripe} className={styles.submitButton}>
                    Pay
                </button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
