import { Link } from 'react-router-dom';
import './Footer.css'

function Footer() {
    return (
        <footer>
            {/* split into three columns */}
            <div className="vert-split-three">
                <div className="each-third">
                    <div className="footer-heading">CONTACT US</div>
                    <div>Locate Us</div>
                    <div>FAQs</div>
                </div>
                <div className="each-third">
                    <div className="footer-heading"><Link to="/About">ABOUT US</Link></div>
                    <div>Terms and Conditions</div>
                    <div>Privacy Policy</div>
                </div>
                <div className="each-third">
                    <div className="footer-heading">COOKIES & CACHE</div>
                    <div>Delivery Policy</div>
                </div>
            </div>
            {/* bottommost copyright text */}
            <div className="bottom-footer">Copyright © 2025 General379 Pte Ltd | Terms of Use | Privacy Policy</div>
        </footer>
    );
}

export default Footer;