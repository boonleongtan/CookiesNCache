function GetCustDeets() {
    async function handleCheckout(formData) {
        const custDeets = {
            email: formData.get('email'),
            tel: formData.get('tel'),
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
            prediscount: formData.get('prediscount'),
            paid: formData.get('paid'),
        };
        const response = await fetch("/api/checkout", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(custDeets),
        });
        if (response.ok) {
            console.log('Checkout success');
        }
    }

    return (
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
                    name="tel"
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
    );
}

export default GetCustDeets;