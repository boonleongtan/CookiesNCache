import Cart from '../components/Cart';

function FullCart() {
    return (
        <Cart>
            <table class="cart-table">

                <tr>
                    <th style="padding-left:20px;">PRODUCTS</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                </tr>

                {/* {% for cookie in cookies %}
                    <tr>
                        <td>
                            <img src="{{ cookie.img }}" alt="Image of {{ cookie.name }}" class="cart-item-left cart-img">
                            <div class="cart-item-right">
                                <form action="/product" method="post">
                                    <input name="id" type="hidden" value="{{ cookie.id }}">
                                    <button href="/product">{{ cookie.name }}</button>
                                </form>
                                <p>{{ cookie.price | usd }}</p>
                            </div>
                        </td>
                        <td>
                            <form action="/editcart" method="post">
                                <input name="id" type="hidden" value="{{ cookie.id }}">
                                <div class="number-input">
                                    <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"></button>
                                    <input name="qty" class="qty-indicator" type="number" min="0" value="{{ cookie.qty }}">
                                    <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button>
                                </div>
                            </form>
                        </td>
                        <td>{{ cookie.total | usd }}</td>
                    </tr>
                {% endfor %}

                <tr>
                    <td></td>
                    <td style="text-align:right;">GRAND TOTAL</td>
                    <td>{{ grandtotal | usd }}</td>
                </tr> */}

                </table>

                <form action="/checkout" method="get">
                    <button class="checkout" type="submit">Proceed to Checkout</button>
                </form>

                <div class="beforefooterspace"></div>
        </Cart>
    );
}

export default FullCart;