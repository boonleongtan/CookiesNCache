import { useEffect } from 'react';
import Layout from '../components/Layout';

function Profile({ username = "user" }) {
    useEffect(() => {
        document.title = 'Profile | Cookies & Cache!';
    }, []);

    return (
        <Layout>
            <h1>Welcome, {username}</h1>

            <h4 style={{marginTop: 0}}>Any item you add to cart now will automatically be saved for your next purchase, unless you checkout.</h4>

            <form action="/logout" className="login">
                <button type="submit">Log out</button>
            </form>
        </Layout>
    );
}

export default Profile;