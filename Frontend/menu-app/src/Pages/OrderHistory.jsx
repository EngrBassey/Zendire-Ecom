import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap';
import Footer from '../components/Footer/Footer';
import { getUserOrders } from '../API/api';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserOrders();
                if (!response.success) {
                    throw new Error('Failed to fetch orders');
                }
                setOrders(response.result);
            } catch (error) {
                setError(error.message);
                // Fetch order details from session storage if API call fails
                const storedOrderDetails = sessionStorage.getItem('newOrderDetails');
                if (storedOrderDetails) {
                    setOrders([JSON.parse(storedOrderDetails)]);
                }
            }
        };
        fetchData();
    }, []);

    return (
        <div className='justify-content-center align-items-center vh-100'>
            <Container className="my-4 pt-4">
                <h1 className="text-center mb-2">Order History</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                {orders.length === 0 ? (
                    <Alert variant="info">No orders found.</Alert>
                ) : (
                    orders.map((order) => (
                        <Card key={order._id} className="mb-4">
                            <Card.Header>
                                <h3>Order ID: {order._id}</h3>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <h4>Shipping Address</h4>
                                        <p>{order.shippingAddress.address}</p>
                                        <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                                    </Col>
                                    <Col md={6}>
                                        <h4>Payment Information</h4>
                                        <p>Status: {order.paymentInfo.status}</p>
                                        <p>Payment Method: {order.paymentMethod}</p>
                                        <p>Paid At: {new Date(order.paidAt).toLocaleString()}</p>
                                        <p>Delivered: {order.isDelivered ? 'Yes' : 'Pending'}</p>
                                    </Col>
                                </Row>
                                <h4>Order Items</h4>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Image</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderItems.map(item => (
                                            <tr key={item._id}>
                                                <td>{item.name}</td>
                                                <td><img src={`http://localhost:5000${item.image}`} alt={item.name} width="50" /></td>
                                                <td>${item.price.toFixed(2)}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <h4>Total Price: ${order.totalPrice.toFixed(2)}</h4>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default OrderHistory;
