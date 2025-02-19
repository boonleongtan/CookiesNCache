import { Link } from 'react-router-dom';
import Cart from '../components/Cart';

function EmptyCart() {
    return (
        <Cart>
            <h4>Your cart is empty</h4>
            <Link to="/" class="continue-shopping">Continue Shopping</Link>
        </Cart>
    );
}

export default EmptyCart;