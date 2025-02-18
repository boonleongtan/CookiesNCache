import { useEffect } from 'react';
import Layout from '../components/Layout';

function About() {
    useEffect(() => {
        document.title = 'About | Cookies & Cache!';
    }, []);

    return (
        <Layout>
            <h1>About Cookies & Cache</h1>

            <p>Cookies & Cache is a decades-long family business specialising in online cookies. Our legendary cookies boast that irresistible crunch and melt-in-your-mouth satisfaction that generations have loved.</p>

            <p>Since 2024, we have been serving you with passion and love, and we will continue to keep up our standards to give you the quality you deserve.</p>
        </Layout>
    );
}

export default About;