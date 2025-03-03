import Layout from '../components/Layout';
import './login.css';

function Register({ setIsRegistered }) {
    function handleRegister() {
        setIsRegistered(true);
    }

    return (
        <>
            <title>Register | Cookies & Cache!</title>

            <Layout>
                <h1 style={{ marginBottom: '25px' }}>Register</h1>

                <form action={handleRegister} className="login">
                    {/* <!--User should be prompted for username, password, and a confirmation--> */}
                    <input autoComplete="off" autoFocus name="username" placeholder="Username" type="text" />
                    <input name="password" placeholder="Password" type="password" />
                    <input name="confirmation" placeholder="Password (again)" type="password" />
                    <button type="submit">Register</button>
                </form>
            </Layout>
        </>
    );
}

export default Register;