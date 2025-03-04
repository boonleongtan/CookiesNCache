import { useState } from 'react';
import NumberInput from './NumberInput';
import { AddToCartAlert } from './Alerts';
import './AddToCart.css';

function AddToCart({ productId }) {
    // allows passing data from child to parent; but can use formData.get(name) also
    // eslint-disable-next-line
    const [receivedQty, setReceivedQty] = useState();
    const [showAlert, setShowAlert] = useState(false);

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
            setShowAlert(true);
        }
    }
    const addProductToCart = addToCart.bind(null, productId);

    return (
        <>
            {showAlert && <AddToCartAlert />}
            
            <form action={addProductToCart}>
                <p className="qtylabel">Quantity</p>
                <NumberInput
                    initialValue={1}
                    sendDataToParent={data => setReceivedQty(data)}
                    allowZero={false}
                    />
                {/* use div for styling */}
                <div>
                    <button className="add-to-cart" type="submit">
                        Add to Cart
                    </button>
                </div>
            </form>
        </>
    );
}

export default AddToCart;