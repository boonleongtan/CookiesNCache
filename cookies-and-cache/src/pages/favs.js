import { useEffect } from 'react';
import Layout from '../components/Layout';

function Favs() {
    useEffect(() => {
        document.title = 'Favorites | Cookies & Cache!';
      }, []);

    return (
        <Layout>
            <h1>Favs</h1>
        </Layout>
    );
}

export default Favs;