import Cookies from 'js-cookie';
const API_URL = 'http://localhost:5000/api'

export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',

        body: JSON.stringify(userData)
    });
    const data = await response.json()
    Cookies.set('Z-Token', data.result.token)
    console.log(Cookies.get('Z-token'));
    return data;
}

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(userData)
    });
    const data = await response.json()
    Cookies.set('Z-Token', data.result.token)
    console.log(Cookies.get('Z-token'));
    return data;
}

export const cart = async (product, quantity) => {
    const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify({ product, quantity }),
      });
    const data = await response.json();
    return data;
}

export const getCart = async () => {
    const response = await fetch(`${API_URL}/cart/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      });
    const data = await response.json();
    return data;
}

export const placeOrder = async (orderDetails) => {
    const response = await fetch(`${API_URL}/payment/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
        withCredentials: true,
        credentials: 'include',
    });
    const data = await response.json();
    return data;
}