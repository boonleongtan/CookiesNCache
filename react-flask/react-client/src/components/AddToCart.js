import './AddToCart.css';
import './NumberInput.css';

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
            console.log("sent data");
        }
    }
    const addProductToCart = addToCart.bind(null, productId);

    return (
        <form action={addProductToCart}>
            <p className="qtylabel">Quantity</p>
            <div className="number-input">
                <button onclick="this.parentNode.querySelector('input[type=number]').stepDown();event.preventDefault();" type="button"></button>
                <input name="qty" type="number" min="1" value="1" />
                <button onclick="this.parentNode.querySelector('input[type=number]').stepUp();event.preventDefault();" className="plus" type="button"></button>
            </div>
            <div>
                <button className="add-to-cart" type="submit">Add to Cart</button>
            </div>
        </form>
    );
}

export default AddToCart;