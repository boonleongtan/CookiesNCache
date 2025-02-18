import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import './product.css';

function Product() {
    // receive props from Link
    const { cookie } = useLocation().state;

    useEffect(() => {
        document.title = cookie.name + ' | Cookies & Cache!';
    }, []);

    return (
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
                    <form action="/cart" method="post">
                        <input name="id" type="hidden" value="{{ cookie.id }}" />
                        <p className="qtylabel">Quantity</p>
                        <div className="number-input">
                            <button onclick="this.parentNode.querySelector('input[type=number]').stepDown();event.preventDefault();" type="button"></button>
                            <input name="qty" type="number" min="1" value="1" />
                            <button onclick="this.parentNode.querySelector('input[type=number]').stepUp();event.preventDefault();" className="plus" type="button"></button>
                        </div>
                        <div>
                            <button className="add-to-cart" type="submit">Add to Cart</button>
                        </div>
                    </form>
                    <h3>Description</h3>
                    <p className="pdt-desc">{cookie.desc}</p>
                    <div className="desc-space"></div>
                </div>
            </div>
        </Layout>
    );
}

export default Product;