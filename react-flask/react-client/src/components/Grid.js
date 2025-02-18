import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import './Grid.css';

function Grid({ apiRoute, children }) {
    const [cookieList, setCookieList] = useState([]);

    useEffect(() => {
        fetch(apiRoute).then(res => res.json()).then(data => {
            setCookieList(data);
        });
    }, [apiRoute]);

    const gridItems = cookieList[0] && cookieList.map((cookie) => {
        return (
            <Link to='/Product' state={{ from: cookie }} className="grid-item">
                <input name="id" type="hidden" value={cookie.id} />
                <img src={cookie.img} alt={cookie.name} className="item-img" />
                <div className="item-name">{cookie.name}</div>
                <div className="item-value">{cookie.price}</div>
            </Link>
        );
    });

    return (
        <Layout>
            {children}
            <div className="grid-container">
                {gridItems}
            </div>
        </Layout>
    )
}

export default Grid;