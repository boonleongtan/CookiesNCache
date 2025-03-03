import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Login from './login';
import './login.css';

function Profile() {
    const [user, setUser] = useState(null);
    console.log(user);

    // useEffect(() => {
    //     fetch('/api/login').then(res => res.json()).then(data => setUser(data.username));
    // }, []);

    async function handleLogOut() {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application.json',
                'Content-type': 'application/json',
            },
            body: "logout",
        });
        if (response.ok) {
            console.log("Successful logout");
            setUser(response.username);
        }
    }

    if (!user) {
        return <Login setUser={setUser} />;
    } else {
        return (
            <>
                <title>Profile | Cookies & Cache!</title>
    
                <Layout>
                    <h1>Welcome, {user}</h1>
                    <h4 style={{marginTop:0}}>Any item you add to cart now will automatically be saved for your next purchase, unless you checkout.</h4>
                    <div className="login"><button type="submit" onClick={handleLogOut}>Log out</button></div>
                </Layout>
            </>
        );
    }
}

export default Profile;