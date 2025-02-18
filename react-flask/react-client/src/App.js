import Grid from './components/Grid';

function App() {

    return (
        <Grid apiRoute={"/api/products"}>
            <h1>Products</h1>
        </Grid>
    );
}

export default App;