// import { useState, useEffect } from 'react';
import Products from './components/Products';
// import './App.css';

function App() {
    // const [currentTime, setCurrentTime] = useState(0);

    // useEffect(() => {
    //     fetch('/api/time').then(res => res.json()).then(data => {
    //         setCurrentTime(data.time);
    //     });
    // }, []);

    return (
        <>
            <h1>Products</h1>
            {/* <p>The current time is {currentTime}</p> */}
            <Products />
        </>
    );
}

export default App;