import { useEffect } from 'react';
import Grid from '../components/Grid';

function Seasonal() {
    useEffect(() => {
        document.title = 'Seasonal | Cookies & Cache!';
      }, []);

    return (
        <Grid apiRoute={"/api/seasonal"}>
            <h1>Seasonal</h1>
        </Grid>
    );
}

export default Seasonal;