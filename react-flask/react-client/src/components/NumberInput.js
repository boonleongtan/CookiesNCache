import './NumberInput.css';

function NumberInput() {
    return (
        <div className="number-input">
            <button onclick="this.parentNode.querySelector('input[type=number]').stepDown();event.preventDefault();" type="button"></button>
            <input name="qty" type="number" min="1" value="1" />
            <button onclick="this.parentNode.querySelector('input[type=number]').stepUp();event.preventDefault();" className="plus" type="button"></button>
        </div>
    );
}

export default NumberInput;