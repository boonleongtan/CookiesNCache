import { useState, useEffect } from 'react';
import Layout from './Layout';

function Grid() {
    return (
        <Layout>
            <div class="grid-container">
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
            </div>
        </Layout>
    )
}

export default Grid;