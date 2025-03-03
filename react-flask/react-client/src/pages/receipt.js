import { useLocation } from "react-router-dom";
import { SpecialHeader } from "../components/Header";
import { SpecialFooter } from "../components/Footer";

function Receipt() {
    const { state } = useLocation();
    console.log(state);

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
                    {/* {% for item in items %}
                        <tr>
                        <td>item.item_name</td>
                        <td>item.item_price | usd</td>
                        <td>item.item_qty</td>
                        </tr>
                        {% endfor %} */}
                </tbody>
            </table>
            <p>Total Price Before Discount: details.prediscount_amt</p>

            <h2 style={{marginLeft:'100px'}}>Input Details</h2>
            <p>Name: details.name</p>
            <p>Email: details.email</p>
            <p>Phone number: details.phone_no</p>
            <p>Country: details.country</p>
            <p>Address: details.address</p>
            <p>Postal Code: details.postal_code</p>
            <p>Chosen Date and Time of Delivery: details.delivery_datetime</p>
            <p>Card Number: details.card_no</p>
            <p>Total Amount Paid (after discount): details.transacted_amt</p>

            <button onClick={window.print} className="checkout" style={{float:'left',marginLeft:'100px'}}>Print Receipt</button>

            <SpecialFooter />
        </>
    );
}

export default Receipt;