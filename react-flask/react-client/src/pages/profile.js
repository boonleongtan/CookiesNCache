import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Login from './login';
import { AlertAlert, SuccessAlert } from '../components/Alerts';
import './login.css';

function Profile() {
    const [user, setUser] = useState(null);
    console.log('profile - user is ' + user);
    const [showLogoutAlert, setShowLogoutAlert] = useState(null);
    const [showLoginAlert, setShowLoginAlert] = useState(null);

    useEffect(() => {
        fetch('/api/login').then(res => res.json()).then(data => setUser(data.username));
    }, []);

    async function handleLogOut() {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application.json',
                'Content-Type': 'application/json',
            },
            body: "logout request",
        });
        if (response.ok) {
            const data = response.json();
            console.log('Successful logout, user is now ' + data.username);
            setUser(data.username);
            setShowLogoutAlert(true);
        }
    }

    if (!user) {
        return (
            <>
                {showLogoutAlert && <AlertAlert alertMsg={"You have logged out successfully~"} />}
                <Login setUser={setUser} setShowLoginAlert={setShowLoginAlert} />
            </>
        );
    } else {
        return (
            <>
                {showLoginAlert && <SuccessAlert successMsg={"Welcome!"} />}

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