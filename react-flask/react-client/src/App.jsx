import Grid from './components/Grid';

function App() {
    return (
        <>
            <title>Products | Cookies & Cache!</title>
            
            <Grid apiRoute={"/api/products"}>
                <h1>Products</h1>
            </Grid>
        </>
    );
}

export default App;