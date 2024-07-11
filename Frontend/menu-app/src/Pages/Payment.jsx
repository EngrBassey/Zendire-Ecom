import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { placeOrder } from '../API/api';

const Payment = (shippingDetails, cart_, amount) => {
    console.log(amount)

  const stripe = useStripe();
  const elements = useElements();

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

    if (error) {      console.error(error);
    } else {
        try {
            const newOrderDetails = {
                ...shippingDetails,
                ...cart_,
                amount,
                paymentMethodId: paymentMethod.id,
              };
            console.log(newOrderDetails);

            sessionStorage.setItem('newOrderDetails', JSON.stringify(newOrderDetails));
            sessionStorage.setItem('paymentMethodId', paymentMethod.id);
            console.log(sessionStorage.getItem(newOrderDetails));
            const response = await placeOrder(newOrderDetails);
            console.log(response);
            if (response.success) {
              console.log('Order placed successfully:', response);
              alert('Order successful');
            } else {
              console.log('Failed to place order', response);
            }
          } catch (error) {
            console.error('Error placing order:', error);
          }
        };

    }
    return (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe || !elements}>
            Place Order
          </button>
        </form>
      );
  };



export default Payment;
