import { useEffect } from 'react';
import Layout from '../components/Layout';

function Seasonal() {
    useEffect(() => {
        document.title = 'Seasonal | Cookies & Cache!';
      }, []);

    return (
        <Layout>
            <h1>Seasonal</h1>
        </Layout>
    );
}

export default Seasonal;