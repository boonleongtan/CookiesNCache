import { useEffect } from 'react';
import Layout from '../components/Layout';

function Cart() {
    useEffect(() => {
        document.title = 'Cart | Cookies & Cache!';
      }, []);

    return (
        <Layout>
            <h1>Cart</h1>
        </Layout>
    );
}

export default Cart;