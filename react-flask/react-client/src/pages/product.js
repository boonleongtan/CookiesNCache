import './product.css';

function Product() {
    return (
        <div class="vert-split-half">
            <div class="each-half">
                <img src="{{ cookie.img }}" alt="Image of {{ cookie.name }}" class="product-img" />
            </div>
            <div class="each-half">
                <h2>cookie.name</h2>
                <h2>cookie.price</h2>
                <p class="pdt-desc">Shipping is calculated at checkout</p>
                <form action="/cart" method="post">
                    <input name="id" type="hidden" value="{{ cookie.id }}" />
                    <p class="qtylabel">Quantity</p>
                    <div class="number-input">
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown();event.preventDefault();" type="button"></button>
                        <input name="qty" type="number" min="1" value="1" />
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp();event.preventDefault();" class="plus" type="button"></button>
                    </div>
                    <div>
                        <button class="add-to-cart" type="submit">Add to Cart</button>
                    </div>
                </form>
                <h3>Description</h3>
                <p class="pdt-desc">cookie.desc</p>
                <div class="desc-space"></div>
            </div>
        </div>
    );
}

export default Product;