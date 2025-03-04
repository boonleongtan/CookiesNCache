import { Link } from 'react-router-dom';
import './Alerts.css';

function AddToCartAlert() {
    function overlayOff() {
        document.querySelector(".overlay").style.display = "none";
    }

    return (
        <div className="overlay" onClick={overlayOff}>
            <div className="alert" style={{height:'50%'}}>
            {/* <!--use cross symbol to close alert--> */}
                <span className="close-alert" onClick={overlayOff}>&times;</span>
            {/* <!--alert message--> */}
                <p style={{color:'blue'}}>Item added to cart!</p>
            {/* <!--nav buttons--> */}
                <Link to="/" id="left">Shop all products {'>'}</Link>
                <Link to="/Cart" id="right">View Cart {'>'}</Link>
            </div>
        </div>
    );
}

export default AddToCartAlert;