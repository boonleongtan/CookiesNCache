import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NumberInput from '../components/NumberInput';
import './fullcart.css';

function FullCart({ cookieCart, refreshCart }) {
    // console.log("Successfully received cart data: ");
    // console.log(cookieCart);
    const [changedQty, setChangedQty] = useState({});
    
    async function sendUpdatedCart() {
        const response = await fetch("/api/cart", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(changedQty),
        });
        if (response.ok) {
            console.log('Cart updated successfully');
            refreshCart(changedQty);
        }
    }
    
    useEffect(() => {
        console.log("Changed item: " + changedQty);
        if (Object.keys(changedQty).length > 0) {
            sendUpdatedCart();
        }
        // eslint-disable-next-line
    }, [changedQty]);


    const cookieRows = cookieCart.cookierows && cookieCart.cookierows.map((cookie) => {
        return (
            <tr key={cookie.id}>
                <td>
                    <img
                        src={cookie.img}
                        alt={cookie.name}
                        className="cart-item-left cart-img"
                    />
                    <div className="cart-item-right">
                        <Link to="/Product" state={{ cookie }} className="cart-item-name">{cookie.name}</Link>
                        <p>{cookie.price}</p>
                    </div>
                </td>
                <td>
                    <NumberInput
                        initialValue={cookie.qty}
                        sendDataToParent={data => setChangedQty({id: cookie.id, qty: data})}
                        allowZero={true}
                    />
                </td>
                <td>{cookie.total}</td>
            </tr>
        );
    })

    return (
        <>
            <table className="cart-table">
                {/* headings */}
                <thead>
                    <tr>
                        <th style={{paddingLeft:"20px"}}>PRODUCTS</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {/* respective cookie rows */}
                    {cookieRows}
                    {/* grandtotal */}
                    <tr>
                        <td></td>
                        <td style={{textAlign:"right"}}>GRAND TOTAL</td>
                        <td>{cookieCart.grandtotal}</td>
                    </tr>
                </tbody>
            </table>

            <Link className="checkout" to="/Checkout">Proceed to Checkout</Link>

            <div className="beforefooterspace"></div>
        </>
    );
}

export default FullCart;