import Layout from '../components/Layout';
import './cart.css';

function Cart({ children }) {
    return (
        <>
            <title>Shopping Cart | Cookies & Cache!</title>

            <Layout>
                <h1>Shopping Cart</h1>
                {children}
            </Layout>
        </>
    );
}

export default Cart;