import { useState, useEffect } from 'react';
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
            <>
                <input name="id" type="hidden" value={cookie.id} />
                <button className="grid-item" type="submit">
                    <img src={cookie.img} alt={"Image of " + cookie.name} className="item-img" />
                    <div className="item-name">{cookie.name}</div>
                    <div className="item-value">{cookie.price}</div>
                </button>
            </>
        );
    });

    return (
        <Layout>
            {children}
            <div className="grid-container">
                <form>
                    {gridItems}
                </form>
            </div>
        </Layout>
    )
}

export default Grid;