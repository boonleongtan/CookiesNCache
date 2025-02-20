function FullCart({ cookieCart }) {
    console.log(cookieCart);
    return (
        <>
            <table className="cart-table">

                <tr>
                    <th style={{paddingLeft: "20px"}}>PRODUCTS</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                </tr>

                    <tr>
                        <td>
                            <img
                                src={cookieCart[0].img}
                                alt={cookieCart[0].name}
                                className="cart-item-left cart-img"
                            />
                            <div className="cart-item-right">
                                <form>
                                    <input
                                        name="id"
                                        type="hidden"
                                        value={cookieCart[0].id}
                                    />
                                    <button href="/product">{cookieCart[0].name}</button>
                                </form>
                                <p>{cookieCart[0].price}</p>
                            </div>
                        </td>
                        <td>
                            TODO
                            {/* <form action="/editcart" method="post">
                                <input name="id" type="hidden" value="{{ cookie.id }}">
                                <div className="number-input">
                                    <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"></button>
                                    <input name="qty" className="qty-indicator" type="number" min="0" value="{{ cookie.qty }}">
                                    <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" className="plus"></button>
                                </div>
                            </form> */}
                        </td>
                        <td>{cookieCart[0].total}</td>
                    </tr>

                {/* <tr>
                    <td></td>
                    <td style="text-align:right;">GRAND TOTAL</td>
                    <td>{{ grandtotal | usd }}</td>
                </tr> */}

                </table>

                <form action="/checkout" method="get">
                    <button className="checkout" type="submit">Proceed to Checkout</button>
                </form>

                <div className="beforefooterspace"></div>
        </>
    );
}

export default FullCart;