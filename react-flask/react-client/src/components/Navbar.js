import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const [searchInput, setSearchInput] = useState("");
    const [searchOutput, setSearchOutput] = useState();

    function handleSearch(e) {
        setSearchInput(e.target.value);

        useEffect(() => {
            fetch().then(res => res.json()).then(data => data)
        })
    }

    return (
        <nav className="navbar">
            <ul className="nav-list">
            {/* <!--dropdown--> */}
                <li className="nav-item">
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
                </li>
            {/* <!--normal nav-item--> */}
                <li className="nav-item"><Link className="nav-link" to="/Seasonal">SEASONAL DELIGHTS</Link></li>
            {/* <!--normal nav-item--> */}
                <li className="nav-item"><Link className="nav-link" to="/About">ABOUT</Link></li>
            {/* <!--search bar--> */}
                <li className="nav-item">
                    <div className="search">
                        <input
                            type="text"
                            className="nav-searchbar"
                            placeholder="Search for a product"
                            value={searchInput}
                            onChange={handleSearch}
                        />
                        <button className="nav-searchbutton">Search</button>
                        <div className="nav-searchlist"></div>
                    </div>
                </li>
            {/* <!--profile icon--> */}
                <li className="nav-item"><Link className="nav-profile" to="/Profile"><img src="/profile_icon.jpg" alt="Profile" className="nav-profile" /></Link></li>
            {/* <!--cart icon--> */}
                <li className="nav-item"><Link className="nav-profile" to="/Cart"><img src="/cart_icon.png" alt="Cart" className="nav-cart" /></Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;