import { Link } from 'react-router-dom';
import './Alerts.css';

function overlayOff() {
    document.querySelector(".overlay").style.display = "none";
}

export function AddToCartAlert() {
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

export function LoginErrorMsgs({ errMsg }) {
    return (
        <div className="overlay" onClick={overlayOff}>
            <div className="alert" style={{height:'40%'}}>
            {/* <!--use cross symbol to close alert--> */}
                <span className="close-alert" onClick={overlayOff}>&times;</span>
            {/* <!--alert message--> */}
                <p style={{color:'red'}}>{errMsg}</p>
            </div>
        </div>
    );
}

export function CheckoutAlert() {
    return (
        <div className="overlay" onClick={overlayOff}>
            <div className="alert" style={{height:'40%'}}>
            {/* <!--use cross symbol to close alert--> */}
                <span className="close-alert" onClick={overlayOff}>&times;</span>
            {/* <!--alert message--> */}
                <p style={{color:'green'}}>Thank you for shopping with us! 😊</p>
            </div>
        </div>
    );
}