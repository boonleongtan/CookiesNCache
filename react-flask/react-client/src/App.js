// import { useState, useEffect } from 'react';
import Products from './components/Products';
// import './App.css';

function App() {
<<<<<<< HEAD
    return (
        <>
            <h1>Products</h1>
<<<<<<< HEAD
            <Grid apiRoute="/api" />
=======
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
>>>>>>> parent of 89363f2 (remove product.js)
=======
            <Grid apiRoute="/api/products" />
>>>>>>> parent of 2d09969 (edit)
        </>
    );
}

export default App;