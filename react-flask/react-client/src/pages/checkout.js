import { useState, useEffect } from 'react';
import { SpecialHeader } from '../components/Header';
import { SpecialFooter } from '../components/Footer';
import './checkout.css';

function Checkout() {
    const [checkoutCart, setCheckoutCart] = useState({});
    console.log(checkoutCart);

    useEffect(() => {
        fetch("/api/checkout").then(res => res.json()).then(data => setCheckoutCart(data));
        // eslint-disable-next-line
    }, []);

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

    function handleGiftCode() {}

    function handleCheckout() {}

    return (
        <>
            <title>Checkout | Cookies & Cache!</title>

            <SpecialHeader />

            <h1>Delivery</h1>

            <div className="vert-split-half">

                {/* <!--Left half: fill in details sections--> */}
                <div className="each-half" style={{width:'60%'}}>
                    <form action={handleCheckout}>
                        <div className="fill-in-details-section">
                            <h3>Contact</h3>
                            <input
                                autoComplete="email"
                                autoFocus
                                name="email"
                                placeholder="Email"
                                type="email"
                                required
                            />
                            <input
                                autoComplete="tel"
                                name="phone-no"
                                inputMode="numeric"
                                pattern="\+?[0-9\-\s]+"
                                title="Allowed characters: +, -, space, numbers"
                                placeholder="Phone Number"
                                type="tel"
                                required
                            />
                        </div>
                        <div className="fill-in-details-section">
                            <h3>Delivery Address</h3>
                            <label htmlFor="country">Country/Region</label>
                            <select name="country" style={{width:'95%'}} defaultValue={"Singapore"} required>
                                <option value="" disabled>Select Country/Region</option>
                                <option value="Singapore">Singapore</option>
                            </select>
                            <div className="fill-in-details-inline">
                                <input
                                    autoComplete="given-name"
                                    name="fname"
                                    placeholder="First Name"
                                    type="text"
                                    required
                                />
                                <input
                                    autoComplete="family-name"
                                    name="lname"
                                    placeholder="Last Name"
                                    type="text"
                                    required
                                />
                            </div>
                            <input
                                autoComplete="street-address"
                                name="address"
                                placeholder="Address"
                                type="text"
                                required
                            />
                            <input
                                autoComplete="postal-code"
                                name="postal-code"
                                placeholder="Postal Code"
                                type="text"
                                required
                            />
                        </div>
                        <div className="fill-in-details-section">
                            <h3>Delivery Date and Time</h3>
                            <input
                                name="delivery-datetime"
                                type="datetime-local"
                                required
                            />
                        </div>
                        <div className="fill-in-details-section">
                            <h3>Payment</h3>
                            <input
                                autoComplete="cc-number"
                                name="card-no"
                                inputMode="numeric"
                                maxLength="19"
                                pattern="[0-9\s]{13,19}"
                                placeholder="Card Number"
                                title="Must be a valid credit card number!"
                                type="tel"
                                required
                            />
                            <div className="fill-in-details-inline">
                                <input
                                    autoComplete="cc-exp"
                                    name="card-exp"
                                    placeholder="Expiration Date (MM/YY)"
                                    pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                                    title="MM/YY"
                                    type="text"
                                    required
                                />
                                <input
                                    autoComplete="cc-csc"
                                    name="card-code"
                                    inputMode="numeric"
                                    maxLength="3"
                                    pattern="[0-9]{3}"
                                    placeholder="CVV"
                                    title="xxx"
                                    type="tel"
                                    required
                                />
                            </div>
                            <input
                                autoComplete="cc-name"
                                name="card-name"
                                placeholder="Name on card"
                                type="text"
                                required
                            />
                        </div>
                        <input
                            name="prediscount"
                            type="hidden"
                            value="{{ subtotal | usd }}"
                        />
                        <input
                            name="paid"
                            type="hidden"
                            value="{{ total | usd }}"
                        />
                        <button className="paynow" type="submit">Pay now</button>
                    </form>
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
                                <form action={handleGiftCode}>
                                    <td>
                                        <input name="gift-code" placeholder="Discount code or gift card" style={{width:'110%',margin:0}} type="text" />
                                    </td>
                                    <td></td>
                                    <td style={{padding:0}}>
                                        <button className="apply-gift-code-btn" type="submit">Apply</button>
                                    </td>
                                </form>
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