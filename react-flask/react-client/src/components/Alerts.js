import './Alerts.css';

function AddToCartAlert() {
    function overlayOff() {}

    return (
        <div className="overlay" onClick={overlayOff}>
            <div className="alert" style="height:50%;">
            {/* <!--use cross symbol to close alert--> */}
                <span className="close-alert" onclick="this.parentElement.style.display='none';overlay_off()">&times;</span>
            {/* <!--alert message--> */}
                <p style="color:blue;"></p>
            {/* <!--nav buttons--> */}
                <a href="/" id="left">Shop all products {'>'}</a>
                <a href="/cart" id="right">View Cart {'>'}</a>
            </div>
        </div>
    );
}

export default AddToCartAlert;