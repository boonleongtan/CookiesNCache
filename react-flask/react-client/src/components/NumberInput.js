import { useState } from 'react';
import './NumberInput.css';

function NumberInput() {
    const [qty, setQty] = useState(1);
    
    function decCnt(e) {
        e.preventDefault();
        setQty(qty => qty - 1);
    }
    
    function incCnt(e) {
        e.preventDefault();
        setQty(qty => qty + 1);
    }

    function handleInput(e) {
        if (e.target.value === "") {
            setQty("");
        } else {
            let val = Number(e.target.value);
            setQty(val > 0 ? val : 1);
        }
    }

    return (
        <div className="number-input">
            <button onClick={decCnt}></button>
            <input name="qty" type="number" min="1" value={qty} onChange={handleInput} />
            <button onClick={incCnt} className="plus"></button>
        </div>
    );
}

export default NumberInput;