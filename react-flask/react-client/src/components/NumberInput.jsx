import { useState } from 'react';
import './NumberInput.css';

function NumberInput({ sendDataToParent, initialValue, allowZero }) {
    const [qty, setQty] = useState(initialValue);
    // allows passing data from child to parent via sendDataToParent; but can use formData.get(name) in parent also
    let newQty = qty;
    
    function decCnt(e) {
        e.preventDefault();
        if (allowZero) {
            newQty = qty > 0 ? qty - 1 : qty;
        } else {
            newQty = qty > 1 ? qty - 1 : qty;
        }
        setQty(newQty);
        sendDataToParent(newQty);
    }
    
    function incCnt(e) {
        e.preventDefault();
        newQty = qty < 100 ? qty + 1 : qty;
        setQty(newQty);
        sendDataToParent(newQty);
    }
    
    function handleInput(e) {
        if (e.target.value === "") {
            setQty("");
        } else {
            let val = Number(e.target.value);
            if (allowZero) {
                newQty = val >= 0 && val < 101 ? val : val > 100 ? 100 : 1;
            } else {
                newQty = val > 0 && val < 101 ? val : val > 100 ? 100 : 1;
            }
            setQty(newQty);
            sendDataToParent(newQty);
        }
    }
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            newQty = allowZero ? qty : qty + 1;
            setQty(newQty);
            sendDataToParent(newQty);
        }
    }

    return (
        <div className="number-input">
            <button onClick={decCnt}></button>
            <input
                required
                name="qty"
                type="number"
                value={qty}
                onChange={handleInput}
                onKeyDown={handleEnterKey}
            />
            <button onClick={incCnt} className="plus"></button>
        </div>
    );
}

export default NumberInput;