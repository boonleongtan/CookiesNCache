import { useState } from 'react';
import Layout from '../components/Layout';
import Login from './login';
import './login.css';

function Profile({ username = "user" }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogOut() {
        setIsLoggedIn(false);
    }

    if (!isLoggedIn) {
        return <Login setIsLoggedIn={setIsLoggedIn} />;
    } else {
        return (
            <>
                <title>Profile | Cookies & Cache!</title>
    
                <Layout>
                    <h1>Welcome, {username}</h1>
                    <h4 style={{marginTop:0}}>Any item you add to cart now will automatically be saved for your next purchase, unless you checkout.</h4>
                    <div className="login"><button type="submit" onClick={handleLogOut}>Log out</button></div>
                </Layout>
            </>
        );
    }
}

export default Profile;