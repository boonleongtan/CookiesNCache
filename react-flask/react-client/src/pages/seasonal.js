import Grid from '../components/Grid';

function Seasonal() {
    return (
        <>
            <title>Seasonal Products | Cookies & Cache!</title>

            <Grid apiRoute={"/api/seasonal"}>
                <h1>Seasonal Products</h1>
                <h4>Be it Christmas, Halloween, or even Chinese New Year, we have just the right products in store for you!</h4>
            </Grid>
        </>
    );
}

export default Seasonal;