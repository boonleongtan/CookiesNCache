import { Link } from 'react-router-dom';

function FullCart({ cookieCart }) {
    console.log("Successfully received cart data: ");
    console.log(cookieCart);

    const cookieRows = cookieCart.cookierows && cookieCart.cookierows.map((cookie) => {
        return (
            <tr>
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
                <td>{cookie.total}</td>
            </tr>
        );
    })

    return (
        <>
            <table className="cart-table">
                {/* headings */}
                <tr>
                    <th style={{paddingLeft: "20px"}}>PRODUCTS</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                </tr>
                {/* respective cookie rows */}
                {cookieRows}
                {/* grandtotal */}
                <tr>
                    <td></td>
                    <td style={{textAlign: "right"}}>GRAND TOTAL</td>
                    <td>{cookieCart.grandtotal}</td>
                </tr>
            </table>

            <form>
                <button className="checkout" type="submit">Proceed to Checkout</button>
            </form>

            <div className="beforefooterspace"></div>
        </>
    );
}

export default FullCart;