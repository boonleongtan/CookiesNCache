// import { useState, useEffect } from 'react';
import Grid from './components/Grid';
// import './App.css';

function App() {
    // const [currentTime, setCurrentTime] = useState(0);

    // useEffect(() => {
    //     fetch('/api/time').then(res => res.json()).then(data => {
    //         setCurrentTime(data.time);
    //     });
    // }, []);

    return (
        <Grid>
            <h1>Products</h1>
            {/* <p>The current time is {currentTime}</p> */}
        </Grid>
    );
}

export default App;