import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import FullCart from './fullcart';
import EmptyCart from './emptycart';
import './cart.css';

function Cart() {
    const [cookieCart, setCookieCart] = useState([]);
    
    useEffect(() => {
        fetch("/api/cart").then(res => res.json()).then(data => setCookieCart(data));
    }, []);

    return (
        <>
            <title>Shopping Cart | Cookies & Cache!</title>

            <Layout>
                <h1>Shopping Cart</h1>
                {cookieCart[0] ? <FullCart /> : <EmptyCart />}
            </Layout>
        </>
    );
}

export default Cart;