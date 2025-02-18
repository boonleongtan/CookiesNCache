import Grid from './components/Grid';
// import './App.css';

function App() {

    return (
        <>
            <h1>Products</h1>
            <Grid apiRoute={"/api/products"} />
        </>
    );
}

export default App;