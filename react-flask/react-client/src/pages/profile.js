import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import './login.css';

function Profile() {
    let navigate = useNavigate();

    const [user, setUser] = useState(false);

    useEffect(() => {
        fetch('/api/login').then(res => res.json()).then(data => setUser(data));
    }, []);

    function handleLogOut() {
        setUser(false);
    }

    if (!user) {
        navigate('/Login', { replace: true });
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