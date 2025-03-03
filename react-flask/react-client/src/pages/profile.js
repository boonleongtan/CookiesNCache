import Layout from '../components/Layout';
import './login.css';

function Profile({ username = "user" }) {
    return (
        <>
            <title>Profile | Cookies & Cache!</title>

            <Layout>
                <h1>Welcome, {username}</h1>

                <h4 style={{marginTop:0}}>Any item you add to cart now will automatically be saved for your next purchase, unless you checkout.</h4>

                <form action="/logout" className="login">
                    <button type="submit">Log out</button>
                </form>
            </Layout>
        </>
    );
}

export default Profile;