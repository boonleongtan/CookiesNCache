import Grid from './components/Grid';
// import './App.css';

function App() {

    return (
        <Grid apiRoute={"/api/products"}>
            <h1>Products</h1>
        </Grid>
    );
}

export default App;