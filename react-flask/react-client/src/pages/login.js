import { useState } from 'react';
import Layout from '../components/Layout';
import Register from './register';
import './login.css';

function Login({ setUser }) {
    const [isRegistered, setIsRegistered] = useState(true);

    async function handleLogIn(formData) {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password'),
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Successful login, user is ' + data.username);
            setUser(data.username);
        }
    }

    function handleRegister() {
        setIsRegistered(false);
    }

    if (!isRegistered) {
        return <Register setUser={setUser} />;
    } else {
        return (
            <>
                <title>Login | Cookies & Cache!</title>
    
                <Layout>
                    <h1 style={{marginBottom:'25px'}}>Login</h1>
                    <h4 style={{marginTop:'-20px'}}>Sign in now to gain access to your own shopping cart!</h4>
                    <h4 style={{color:'red',backgroundColor:'yellow',marginBottom:'25px'}}>WARNING! ALL YOUR CURRENT CART ITEMS WILL BE ADDED TO YOUR PERSONAL SHOPPING CART AND SAVED TO CLOUD. PROCEED WITH CAUTION.</h4>
    
                    <div className="login">
                        <form action={handleLogIn}>
                            <input autoComplete="off" autoFocus name="username" placeholder="Username" type="text" />
                            <input name="password" placeholder="Password" type="password" />
                            <button type="submit">Log In</button>
                        </form>
                        <span>---------- <i>or</i> ----------</span>
                        <button type="submit" style={{paddingLeft:'105px',paddingRight:'105px'}} onClick={handleRegister}>Sign Up</button>
                    </div>
                </Layout>
            </>
        );
    }
}

export default Login;