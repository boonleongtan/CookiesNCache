import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { SpecialHeader } from '../components/Header';
import { SpecialFooter } from '../components/Footer';
import GetCustDeets from '../components/GetCustDeets';
import './checkout.css';

function Checkout() {
    let navigate = useNavigate();

    const [checkoutCart, setCheckoutCart] = useState({});
    console.log(checkoutCart);
    const [giftCode, setGiftCode] = useState('');
    const [refreshGCS, setRefreshGCS] = useState(false);

    useEffect(() => {
        fetch("/api/checkout").then(res => res.json()).then(data => setCheckoutCart(data));
        // eslint-disable-next-line
    }, [refreshGCS]);

    const productRow = checkoutCart.cookies && checkoutCart.cookies.map(product => {
        return (
            <tr key={product.id}>
                <td>
                    <img src={ product.img } alt={product.name} className="checkout-img" />
                    <p>{ product.name }</p>
                </td>
                <td>{ product.qty }</td>
                <td>{ product.total }</td>
            </tr>
        );
    })

    async function handleGiftCode() {
        const response = await fetch("/api/giftcode", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(giftCode),
        });
        if (response.ok) {
            console.log(await response.text());
            setRefreshGCS(!refreshGCS);
        }
    }

    async function handleCheckout(formData) {
        const custDeets = {
            email: formData.get('email'),
            phoneNo: formData.get('phone-no'),
            country: formData.get('country'),
            fname: formData.get('fname'),
            lname: formData.get('lname'),
            address: formData.get('address'),
            postalCode: formData.get('postal-code'),
            deliveryDatetime: formData.get('delivery-datetime'),
            cardNo: formData.get('card-no'),
            cardExp: formData.get('card-exp'),
            cardCode: formData.get('card-code'),
            cardName: formData.get('card-name'),
            prediscount: checkoutCart.subtotal,
            paid: checkoutCart.total,
        };
        const response = await fetch("/api/receipt", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(custDeets),
        });
        if (response.ok) {
            console.log(await response.text());
            navigate("/Receipt", {
                replace: true,
                state: {
                    details: custDeets,
                    items: checkoutCart.cookies,
                    timeOfPurchase: new Date(),
                },
            });
        }
    }

    return (
        <>
            <title>Checkout | Cookies & Cache!</title>

            <SpecialHeader />

            <h1>Delivery</h1>

            <div className="vert-split-half">

                {/* <!--Left half: fill in details sections--> */}
                <div className="each-half" style={{width:'60%'}}>
                    <GetCustDeets handleCheckout={handleCheckout} />
                </div>

                {/* <!--Right half: checkout product details--> */}
                <div className="each-half checkout-info-section">
                    <table>
                        <tbody>

                            {/* <!--product row--> */}
                            {productRow}

                            {/* <!--subtotal row--> */}
                            <tr className="no-border-bottom no-padding">
                                <td>
                                    <p className="checkout-subtotal" style={{lineHeight:'3.5vw'}}>Subtotal</p>
                                </td>
                                <td></td>
                                <td>
                                    <p className="checkout-subtotal" style={{lineHeight:'3.5vw',textAlign:'right'}}>{ checkoutCart.subtotal }</p>
                                </td>
                            </tr>

                            {/* <!--gift code row--> */}
                            <tr className="no-border-bottom no-padding fill-in-details-section">
                                <td>
                                    <input
                                        name="gift-code"
                                        placeholder="Discount code or gift card"
                                        style={{width:'110%',margin:0}}
                                        type="text"
                                        value={giftCode}
                                        onChange={e => setGiftCode(e.target.value)}
                                        onKeyUp={e => e.key === 'Enter' && handleGiftCode()}
                                    />
                                </td>
                                <td></td>
                                <td style={{padding:0}}>
                                    <button className="apply-gift-code-btn" type="submit" onClick={handleGiftCode}>Apply</button>
                                </td>
                            </tr>

                            {/* <!--gift code status row--> */}
                            <tr className="no-padding">
                                <td>
                                    <p className="gift-code-status" style={{paddingBottom:'10%',lineHeight:'3.5vw'}}>{ checkoutCart.gift_code_status}</p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>

                            {/* <!--total row--> */}
                            <tr className="no-border-bottom no-padding">
                                <td>
                                    <p className="checkout-total">Total</p>
                                </td>
                                <td></td>
                                <td>
                                    <p className="checkout-total" style={{textAlign:'right'}}>{ checkoutCart.total }</p>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>

            <SpecialFooter />
        </>
    );
}

export default Checkout;