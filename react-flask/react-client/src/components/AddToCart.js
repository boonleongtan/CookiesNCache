import { useState } from 'react';
import NumberInput from './NumberInput';
import './AddToCart.css';

function AddToCart({ productId }) {
    // allows passing data from child to parent; but can use formData.get(name) also
    const [recQty, setRecQty] = useState();

    async function addToCart(productId, formData) {
        const response = await fetch("/api/addtocart", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: productId,
                qty: formData.get("qty"),
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
            <NumberInput sendDataToParent={data => setRecQty(data)}/>
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