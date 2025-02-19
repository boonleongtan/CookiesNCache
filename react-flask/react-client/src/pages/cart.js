import { useEffect } from 'react';
import Layout from '../components/Layout';
import './cart.css';

function Cart({ children }) {
    useEffect(() => {
        document.title = 'Shopping Cart | Cookies & Cache!';
    }, []);

    return (
        <Layout>
            <h1>Shopping Cart</h1>
            {children}
        </Layout>
    );
}

export default Cart;