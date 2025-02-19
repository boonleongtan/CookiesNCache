import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

function Dropdown() {
    return (
        <div className="dropdown">
            <button className="dropdown-button">
                <Link to="/">SHOP NOW</Link>
                <span className="caret-down"></span>
            </button>
            <div className="dropdown-content">
                <Link to="/">ALL PRODUCTS</Link>
                <Link to="/Favs">ALL-TIME FAVOURITES</Link>
            </div>
        </div>
    );
}

function Searchbar() {
    const [searchInput, setSearchInput] = useState("");
    const [searchOutput, setSearchOutput] = useState([]);

    useEffect(() => {
        fetch("/api/search?q=" + searchInput).then(res => res.json()).then(data => {
            setSearchOutput(data);
        });
    }, [searchInput]);

    const navSearchList = searchOutput[0] && searchOutput.map((cookie) => {
        return (
            <Link to="/Product" state={{ cookie: cookie }} className="nav-searchitem">
                <input name="id" type="hidden" value={cookie.id} />
                <img src={cookie.img} alt={cookie.name} className="nav-searchimg" />
                <button className="nav-searchname">{cookie.name}</button>
            </Link>
        );
    });

    return (
        <div className="search">
            <input
                type="text"
                className="nav-searchbar"
                placeholder="Search for a product"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />
            <button className="nav-searchbutton">Search</button>
            <div className="nav-searchlist">{navSearchList}</div>
        </div>
    );
}

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-list">

                {/* <!--dropdown--> */}
                <li className="nav-item">
                    <Dropdown />
                </li>

                {/* <!--normal nav-item--> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/Seasonal">
                        SEASONAL DELIGHTS
                    </Link>
                </li>

                {/* <!--normal nav-item--> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/About">
                        ABOUT
                    </Link>
                </li>

                {/* <!--search bar--> */}
                <li className="nav-item">
                    <Searchbar />
                </li>

                {/* <!--profile icon--> */}
                <li className="nav-item">
                    <Link className="nav-profile" to="/Profile">
                        <img src="/profile_icon.jpg" alt="Profile" className="nav-profile" />
                    </Link>
                </li>

                {/* <!--cart icon--> */}
                <li className="nav-item">
                    <Link className="nav-profile" to="/Cart">
                        <img src="/cart_icon.png" alt="Cart" className="nav-cart" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;