import {Link} from "react-router-dom";
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-list">
            {/* <!--dropdown--> */}
                <li className="nav-item"><Link to="{/about}">
                    <div className="dropdown">
                        <button className="dropdown-button">
                            <a href="/">SHOP NOW</a>
                            <span className="caret-down"></span>
                        </button>
                        <div className="dropdown-content">
                            <a href="/">ALL PRODUCTS</a>
                            <a href="/favs">ALL-TIME FAVOURITES</a>
                        </div>
                    </div>
                    </Link></li>
            {/* <!--normal nav-item--> */}
                <li className="nav-item"><a className="nav-link" href="/seasonal">SEASONAL DELIGHTS</a></li>
            {/* <!--normal nav-item--> */}
                <li className="nav-item"><a className="nav-link" href="/about">ABOUT</a></li>
            {/* <!--search bar--> */}
                <li className="nav-item">
                    <div className="search">
                        <input type="text" name="search" id="nav-searchbar" placeholder="Search for a product" onkeydown="search()" />
                        <button className="nav-searchbutton">Search</button>
                        <div className="nav-searchlist"></div>
                    </div>
                </li>
            {/* <!--profile icon--> */}
                <li className="nav-item"><a className="nav-profile" href="/profile"><img src="/profile_icon.jpg" alt="Profile" className="nav-profile" /></a></li>
            {/* <!--cart icon--> */}
                <li className="nav-item"><a className="nav-profile" href="/cart"><img src="/cart_icon.png" alt="Cart" className="nav-cart" /></a></li>
            </ul>
        </nav>
    );
}

export default Navbar;