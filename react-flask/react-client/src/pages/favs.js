import { useEffect } from 'react';
import Grid from '../components/Grid';

function Favs() {
    useEffect(() => {
        document.title = 'Our Favourites | Cookies & Cache!';
    }, []);

    return (
        <Grid apiRoute={"/api/favs"}>
            <h1>Our Favourites</h1>
            <h4>Experience our most popular products, carefully picked and prepared just for you.</h4>
        </Grid>
    );
}

export default Favs;