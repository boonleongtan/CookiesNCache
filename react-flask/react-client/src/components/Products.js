import { useState, useEffect } from 'react';
import Grid from './Grid';

function Products() {
    const [cookieList, setCookieList] = useState([]);

    useEffect(() => {
        fetch('/api/').then(res => res.json()).then(data => {
            setCookieList(data);
        });
    }, []);

    return (
        <Grid>
            <form>
                <input name="id" type="hidden" value={cookieList[0].id} />
                <button className="grid-item" type="submit">
                    <img src={cookieList[0].img} alt={"Image of " + cookieList[0].name} className="item-img" />
                    <div className="item-name">{cookieList[0].name}</div>
                    <div className="item-value">{cookieList[0].price}</div>
                </button>
            </form>
            {/* {% for cookie in cookies %}
                <form action="/product" method="post">
                    <input name="id" type="hidden" value="{{ cookie.id }}">
                    <button class="grid-item" type="submit">
                        <img src="{{ cookie.img }}" alt="Image of {{ cookie.name }}" class="item-img">
                        <div class="item-name">{{ cookie.name }}</div>
                        <div class="item-value">{{ cookie.price | usd }}</div>
                    </button>
                </form>
            {% endfor %} */}
        </Grid>
    )
}

export default Products;