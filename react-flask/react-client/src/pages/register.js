import Layout from '../components/Layout';
import './login.css';

function Register({ setUser, setShowRegisteredAlert }) {
    async function handleRegister(formData) {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password"),
                confirmation: formData.get("confirmation"),
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Successful registration, user is ' + data.username);
            setUser(data.username);
            setShowRegisteredAlert(true);
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