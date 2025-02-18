import { useEffect } from 'react';
import Layout from '../components/Layout';

function Profile() {
    useEffect(() => {
        document.title = 'Profile | Cookies & Cache!';
    }, []);

    return (
        <Layout>
            <h1>Profile</h1>
        </Layout>
    );
}

export default Profile;