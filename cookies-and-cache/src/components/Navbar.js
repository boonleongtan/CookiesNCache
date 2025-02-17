import {Link} from "react-router-dom";
import './Navbar.css';

function Navbar() {
    return (
        <nav class="navbar">
            <ul class="nav-list">
            {/* <!--dropdown--> */}
                <li class="nav-item"><Link to="{/about}">
                    <div class="dropdown">
                        <button class="dropdown-button">
                            <a href="/">SHOP NOW</a>
                            <span class="caret-down"></span>
                        </button>
                        <div class="dropdown-content">
                            <a href="/">ALL PRODUCTS</a>
                            <a href="/favs">ALL-TIME FAVOURITES</a>
                        </div>
                    </div>
                    </Link></li>
            {/* <!--normal nav-item--> */}
                <li class="nav-item"><a class="nav-link" href="/seasonal">SEASONAL DELIGHTS</a></li>
            {/* <!--normal nav-item--> */}
                <li class="nav-item"><a class="nav-link" href="/about">ABOUT</a></li>
            {/* <!--search bar--> */}
                <li class="nav-item">
                    <div class="search">
                        <input type="text" name="search" id="nav-searchbar" placeholder="Search for a product" onkeydown="search()" />
                        <button class="nav-searchbutton">Search</button>
                        <div class="nav-searchlist"></div>
                    </div>
                </li>
            {/* <!--profile icon--> */}
                <li class="nav-item"><a class="nav-profile" href="/profile"><img src="/static/profile_icon.jpg" alt="Profile" class="nav-profile" /></a></li>
            {/* <!--cart icon--> */}
                <li class="nav-item"><a class="nav-profile" href="/cart"><img src="/static/cart_icon.png" alt="Cart" class="nav-cart" /></a></li>
            </ul>
        </nav>
    );
}

export default Navbar;