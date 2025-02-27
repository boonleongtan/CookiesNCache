import { SpecialHeader } from '../components/Header';
import { SpecialFooter } from '../components/Footer';
import './checkout.css';

function Checkout() {
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
                                autocomplete="email"
                                autofocus
                                name="email"
                                placeholder="Email"
                                type="email"
                                required
                            />
                            <input
                                autocomplete="tel"
                                name="phone-no"
                                inputmode="numeric"
                                pattern="\+?[0-9\-\s]+"
                                title="Allowed characters: +, -, space, numbers"
                                placeholder="Phone Number"
                                type="tel"
                                required
                            />
                        </div>
                        <div className="fill-in-details-section">
                            <h3>Delivery Address</h3>
                            <label for="country">Country/Region</label>
                            <select name="country" style={{width:'95%'}} required>
                                <option value="" disabled>Select Country/Region</option>
                                <option value="Singapore" selected>Singapore</option>
                            </select>
                            <div className="fill-in-details-inline">
                                <input
                                    autocomplete="given-name"
                                    name="fname"
                                    placeholder="First Name"
                                    type="text"
                                    required
                                />
                                <input
                                    autocomplete="family-name"
                                    name="lname"
                                    placeholder="Last Name"
                                    type="text"
                                    required
                                />
                            </div>
                            <input
                                autocomplete="street-address"
                                name="address"
                                placeholder="Address"
                                type="text"
                                required
                            />
                            <input
                                autocomplete="postal-code"
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
                                autocomplete="cc-number"
                                name="card-no"
                                inputmode="numeric"
                                maxlength="19"
                                pattern="[0-9\s]{13,19}"
                                placeholder="Card Number"
                                title="Must be a valid credit card number!"
                                type="tel"
                                required
                            />
                            <div className="fill-in-details-inline">
                                <input
                                    autocomplete="cc-exp"
                                    name="card-exp"
                                    placeholder="Expiration Date (MM/YY)"
                                    pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                                    title="MM/YY"
                                    type="text"
                                    required
                                />
                                <input
                                    autocomplete="cc-csc"
                                    name="card-code"
                                    inputmode="numeric"
                                    maxlength="3"
                                    pattern="[0-9]{3}"
                                    placeholder="CVV"
                                    title="xxx"
                                    type="tel"
                                    required
                                />
                            </div>
                            <input
                                autocomplete="cc-name"
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
                            {/* {% for cookie in cookies %}
                                <tr>
                                <td>
                                <img src="{{ cookie.img }}" className="checkout-img">
                                <p>{{ cookie.name }}</p>
                                </td>
                                <td>{{ cookie.qty }}</td>
                                <td>{{ cookie.total | usd }}</td>
                                </tr>
                                {% endfor %} */}

                            {/* <!--subtotal row--> */}
                            <tr className="no-border-bottom no-padding">
                                <td>
                                    <p className="checkout-subtotal" style={{lineHeight:'3.5vw'}}>Subtotal</p>
                                </td>
                                <td></td>
                                <td>
                                    {/* <p className="checkout-subtotal" style={{lineHeight:'3.5vw',textAlign:'right'}}>{{ subtotal }}</p> */}
                                </td>
                            </tr>
                            <tr className="no-border-bottom no-padding fill-in-details-section">
                                <form action="/giftcode" method="post">
                                    <td>
                                        <input name="gift-code" placeholder="Discount code or gift card" style={{width:'115%',margin:0}} type="text" />
                                    </td>
                                    <td></td>
                                    <td style={{padding:0}}>
                                        <button className="apply-gift-code-btn" type="submit">Apply</button>
                                    </td>
                                </form>
                            </tr>
                            <tr className="no-padding">
                                <td>
                                    {/* <p className="gift-code-status" style={{paddingBottom:'10%',lineHeight:'3.5vw'}}>{{ gift_code_status}}</p> */}
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
                                    {/* <p className="checkout-total" style={{textAlign:'right'}}>{{ total }}</p> */}
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