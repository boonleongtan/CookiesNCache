import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import './Grid.css';

function Grid({ apiRoute, children }) {
    // create state cookie list and set to []
    const [cookieList, setCookieList] = useState([]);
    
    // get the list of dictionaries returned by selecting from products
    useEffect(() => {
        fetch(apiRoute).then(res => res.json()).then(data => {
            setCookieList(data);
        });
    }, []);

    // map cookie list to grid space in grid layout, and add link and pass data
    const gridItems = cookieList[0] && cookieList.map((cookie) => {
        return (
            <Link to='/Product' state={{ cookie: cookie }} className="grid-item" key={cookie.id}>
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