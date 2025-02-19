import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import './product.css';
import './numberinput.css';

function Product() {
    // receive props from Link
    const { cookie } = useLocation().state;

    async function handleClick(e) {
        e.preventDefault();
        const response = await fetch("/api/cart", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: cookie.id,
                qty: 5,
            })
        });
        if (response.ok) {
            console.log("sent data");
        }
    }

    return (
        <>
            <title>{cookie.name} | Cookies & Cache!</title>

            <Layout>
                <div className="vert-split-half">
                    <div className="each-half">
                        <img
                            className="product-img"
                            src={ cookie.img }
                            alt={ cookie.name }
                        />
                    </div>
                    <div className="each-half">
                        <h2>{cookie.name}</h2>
                        <h2>{cookie.price}</h2>
                        <p className="pdt-desc">Shipping is calculated at checkout</p>
                        <form>
                            <input name="id" type="hidden" value="{{ cookie.id }}" />
                            <p className="qtylabel">Quantity</p>
                            <div className="number-input">
                                <button onclick="this.parentNode.querySelector('input[type=number]').stepDown();event.preventDefault();" type="button"></button>
                                <input name="qty" type="number" min="1" value="1" />
                                <button onclick="this.parentNode.querySelector('input[type=number]').stepUp();event.preventDefault();" className="plus" type="button"></button>
                            </div>
                            <div>
                                <button className="add-to-cart" type="submit" onClick={handleClick}>Add to Cart</button>
                            </div>
                        </form>
                        <h3>Description</h3>
                        <p className="pdt-desc">{cookie.desc}</p>
                        <div className="desc-space"></div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Product;