import { useEffect } from 'react';
import Grid from './components/Grid';

function App() {
    useEffect(() => {
        document.title = 'Products | Cookies & Cache!';
    }, []);

    return (
        <Grid apiRoute={"/api/products"}>
            <h1>Products</h1>
        </Grid>
    );
}

export default App;