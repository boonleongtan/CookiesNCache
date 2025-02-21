import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NumberInput from '../components/NumberInput';
import './fullcart.css';

function FullCart({ cookieCart }) {
    // console.log("Successfully received cart data: ");
    // console.log(cookieCart);
    const [rcvdQtyDict, setRcvdQtyDict] = useState({});
    // console.log(rcvdQtyDict);

    async function sendUpdatedCart() {
        const response = await fetch("/api/cart", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(rcvdQtyDict),
        });
        if (response.ok) {
            console.log('Cart updated successfully');
        }
    }

    useEffect(() => {
        sendUpdatedCart();
    }, [rcvdQtyDict]);


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
                    <NumberInput initialValue={cookie.qty} sendDataToParent={data => {setRcvdQtyDict({...rcvdQtyDict, [cookie.id]: data});console.log('works')}} />
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
                        <th style={{paddingLeft: "20px"}}>PRODUCTS</th>
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
                        <td style={{textAlign: "right"}}>GRAND TOTAL</td>
                        <td>{cookieCart.grandtotal}</td>
                    </tr>
                </tbody>
            </table>

            <button className="checkout" type="submit">Proceed to Checkout</button>

            <div className="beforefooterspace"></div>
        </>
    );
}

export default FullCart;