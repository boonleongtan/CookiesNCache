import NumberInput from './NumberInput';
import './AddToCart.css';

function AddToCart({ productId }) {
    async function addToCart(productId, formData) {
        const response = await fetch("/api/cart", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: productId,
                qty: 5,
            })
        });
        if (response.ok) {
            console.log("Sent data successfully!");
        }
    }
    const addProductToCart = addToCart.bind(null, productId);

    return (
        <form action={addProductToCart}>
            <p className="qtylabel">Quantity</p>
            <NumberInput />
            {/* use div for styling */}
            <div>
                <button className="add-to-cart" type="submit">
                    Add to Cart
                </button>
            </div>
        </form>
    );
}

export default AddToCart;