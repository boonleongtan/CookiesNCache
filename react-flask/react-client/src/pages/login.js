import { useState } from 'react';
import Layout from '../components/Layout';
import './login.css';
import Register from './register';

function Login({ setIsLoggedIn }) {
    const [isRegistered, setIsRegistered] = useState(true);

    function handleLogIn() {
        setIsLoggedIn(true);
    }

    function handleRegister() {
        setIsRegistered(false);
    }

    if (!isRegistered) {
        return <Register setIsRegistered={setIsRegistered} />;
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
                            <input autocomplete="off" autofocus name="username" placeholder="Username" type="text" />
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