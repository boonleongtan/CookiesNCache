import { Link } from 'react-router-dom';

function EmptyCart() {
    return (
        <>
            <h4>Your cart is empty</h4>
            <Link to="/" class="continue-shopping">Continue Shopping</Link>
        </>
    );
}

export default EmptyCart;