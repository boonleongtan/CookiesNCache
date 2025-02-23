import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import FullCart from './fullcart';
import EmptyCart from './emptycart';

function Cart() {
    const [cookieCart, setCookieCart] = useState([]);
    const [refreshCart, setRefreshCart] = useState({});
    
    useEffect(() => {
        fetch("/api/cart").then(res => res.json()).then(data => setCookieCart(data));
    }, [refreshCart]);

    return (
        <>
            <title>Shopping Cart | Cookies & Cache!</title>

            <Layout>
                <h1>Shopping Cart</h1>
                {cookieCart.cookierows ? <FullCart cookieCart={cookieCart} refreshCart={data => setRefreshCart(data)} /> : <EmptyCart />}
            </Layout>
        </>
    );
}

export default Cart;