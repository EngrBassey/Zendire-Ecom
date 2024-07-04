import Cookies from 'js-cookie';
const API_URL = 'http://localhost:5000/api'

const setCookie = (name, value, hours) => {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

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
    setCookie('Z-Token', data.result.token, 24)
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
    setCookie('Z-Token', data.result.token, 24);
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

export const removeFromCart = async (sku) => {
    const response = await fetch(`${API_URL}/cart/remove/${sku}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',

        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify({ sku }),
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

export const getUserOrders = async () => {
    const response = await fetch(`${API_URL}/order/user/myorders`, {
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

export const resetCart = async () => {
    const response = await fetch(`${API_URL}/cart/reset`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
    });
    const data = await response.json();
    return data;
}