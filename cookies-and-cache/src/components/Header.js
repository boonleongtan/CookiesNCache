import logo from '../cookies.jpg';
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
            <a href="/">
                <img src={logo} alt="Cookies & Cache Brand Logo" width="150px" height="100px" />
                <div>Cookies & Cache</div>
            </a>
        </header>
    );
}

export default Header;