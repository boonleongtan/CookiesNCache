import { useState } from 'react';
import './NumberInput.css';

function NumberInput({ sendDataToParent }) {
    const [qty, setQty] = useState(1);
    
    function decCnt(e) {
        e.preventDefault();
        setQty(qty => qty > 1 ? qty - 1 : qty);
        console.log(qty);
        sendDataToParent(qty);
    }
    
    function incCnt(e) {
        e.preventDefault();
        setQty(qty => qty < 100 ? qty + 1 : qty);
        console.log(qty);
        sendDataToParent(qty);
    }
    
    function handleInput(e) {
        if (e.target.value === "") {
            setQty(null);
        } else {
            let val = Number(e.target.value);
            setQty(val > 0 && val < 101 ? val : val > 100 ? 100 : 1);
            console.log(qty);
            sendDataToParent(qty);
        }
    }
    function handleEnterKey(e) {
        e.key === 'Enter' && setQty(qty => qty + 1);
        console.log(qty);
        sendDataToParent(qty);
    }

    return (
        <div className="number-input">
            <button onClick={decCnt}></button>
            <input required name="qty" type="number" value={qty} onChange={handleInput} onKeyDown={handleEnterKey} />
            <button onClick={incCnt} className="plus"></button>
        </div>
    );
}

export default NumberInput;