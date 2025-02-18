import { useEffect } from 'react';
import Grid from '../components/Grid';

function Favs() {
    useEffect(() => {
        document.title = 'Favorites | Cookies & Cache!';
      }, []);

    return (
        <Grid apiRoute={"/api/favs"}>
            <h1>Favs</h1>
        </Grid>
    );
}

export default Favs;