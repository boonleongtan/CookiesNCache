import Layout from '../components/Layout';
import './cart.css';
import FullCart from './fullcart';
import EmptyCart from './emptycart';

function Cart() {
    return (
        <>
            <title>Shopping Cart | Cookies & Cache!</title>

            <Layout>
                <h1>Shopping Cart</h1>
                {/* <FullCart /> */}
                <EmptyCart />
            </Layout>
        </>
    );
}

export default Cart;