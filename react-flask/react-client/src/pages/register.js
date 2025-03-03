import Layout from '../components/Layout';
import './login.css';

function Register({ setIsRegistered, setUser }) {
    async function handleRegister(formData) {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password"),
                confirmation: formData.get("confirmation"),
            }),
        });
        if (response.ok) {
            setIsRegistered(true);
            const data = await response.json();
            console.log('Successful login, user is ' + data.username);
            setUser(data.username);
        }
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