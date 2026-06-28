import { Link } from 'react-router-dom';
import './emptycart.css';

function EmptyCart() {
    return (
        <>
            <h4>Your cart is empty</h4>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </>
    );
}

export default EmptyCart;