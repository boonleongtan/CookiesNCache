import { useState } from 'react';
import './NumberInput.css';

function NumberInput() {
    const [qty, setQty] = useState(1);

    function incCnt(e) {
        e.preventDefault();
        setQty(qty => qty - 1);
    }
    
    function decCnt(e) {
        e.preventDefault();
        setQty(qty => qty + 1);
    }

    return (
        <div className="number-input">
            {/* set type="button" to prevent submit */}
            <button onClick={decCnt} type="button"></button>
            <input name="qty" type="number" min="1" value={qty} />
            <button onClick={incCnt} className="plus" type="button"></button>
        </div>
    );
}

export default NumberInput;