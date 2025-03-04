import { Link } from 'react-router-dom';
import './Alerts.css';

function overlayOff() {
    document.querySelector(".overlay").style.display = "none";
}

export function SuccessAlert({ successMsg }) {
    return (
        <div className="overlay" onClick={overlayOff}>
            <div className="alert" style={{height:'50%'}}>
            {/* <!--use cross symbol to close alert--> */}
                <span className="close-alert" onClick={overlayOff}>&times;</span>
            {/* <!--alert message--> */}
                <p style={{color:'blue'}}>{successMsg}</p>
            {/* <!--nav buttons--> */}
                <Link to="/" id="left">Shop all products {'>'}</Link>
                <Link to="/Cart" id="right">View Cart {'>'}</Link>
            </div>
        </div>
    );
}

export function ErrorAlert({ errMsg }) {
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

export function AlertAlert({ alertMsg }) {
    return (
        <div className="overlay" onClick={overlayOff}>
            <div className="alert" style={{height:'40%'}}>
            {/* <!--use cross symbol to close alert--> */}
                <span className="close-alert" onClick={overlayOff}>&times;</span>
            {/* <!--alert message--> */}
                <p style={{color:'green'}}>{alertMsg}</p>
            </div>
        </div>
    );
}