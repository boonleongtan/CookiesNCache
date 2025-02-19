import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import AddToCart from '../components/AddToCart';
import './product.css';

function Product() {
    // receive props from Link
    const { cookie } = useLocation().state;

    return (
        <>
            <title>{cookie.name} | Cookies & Cache!</title>

            <Layout>
                <div className="vert-split-half">
                    {/* Image on the left half */}
                    <div className="each-half">
                        <img
                            className="product-img"
                            src={ cookie.img }
                            alt={ cookie.name }
                        />
                    </div>
                    {/* Product details on the right half */}
                    <div className="each-half">
                        <h2>{cookie.name}</h2>
                        <h2>{cookie.price}</h2>
                        <p className="pdt-desc">Shipping is calculated at checkout</p>
                        <AddToCart productId={cookie.id} />
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