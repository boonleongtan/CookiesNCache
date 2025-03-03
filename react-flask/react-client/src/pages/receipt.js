import { useLocation } from "react-router-dom";
import { SpecialHeader } from "../components/Header";
import { SpecialFooter } from "../components/Footer";

function Receipt() {
    const { state } = useLocation();
    const { details, items } = state;

    const itemRows = items[0] && items.map(item => {
        return (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
            </tr>
        );
    });

    return (
        <>
            <title>Receipt | Cookies & Cache!</title>

            <SpecialHeader />

            <h1>Receipt</h1>

            <h4>Thank you for shopping with us! Below are the details of your transaction:</h4>

            <table style={{marginLeft:'100px',border:'1px solid black'}}>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {itemRows}
                </tbody>
            </table>
            <p>Total Price Before Discount: {details.prediscount}</p>

            <h2 style={{marginLeft:'100px'}}>Input Details</h2>
            <p>Name: {details.fname + " " + details.lname}</p>
            <p>Email: {details.email}</p>
            <p>Phone number: {details.phoneNo}</p>
            <p>Country: {details.country}</p>
            <p>Address: {details.address}</p>
            <p>Postal Code: {details.postalCode}</p>
            <p>Chosen Date and Time of Delivery: {details.deliveryDatetime.slice(0,10) + ", " + details.deliveryDatetime.slice(11)}</p>
            <p>Card Number: {"**** **** **** " + details.cardNo.slice(-4)}</p>
            <p>Total Amount Paid (after discount): {details.paid}</p>

            <button onClick={window.print} className="checkout" style={{float:'left',marginLeft:'100px'}}>Print Receipt</button>

            <SpecialFooter />
        </>
    );
}

export default Receipt;