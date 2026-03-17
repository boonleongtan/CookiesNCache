import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="brand-header center">
            <div className="top-header">
                <div id="welcome">
                    <span id="a">WELCOME TO COOKIES & CACHE</span>
                    <span id="b">ENJOY UP TO 10% OFF SELECTED PRODUCTS WITH CODE: "YAY"!</span>
                </div>
            </div>
            <Link to="/">
                <img src="/cookies.jpg" alt="Cookies & Cache Brand Logo" width="150px" height="100px" />
                <div>Cookies & Cache</div>
            </Link>
        </header>
    );
}

export function SpecialHeader() {
    return (
        <header className="special-header">
            <Link to="/">Cookies & Cache</Link>
        </header>
    );
}

export default Header;