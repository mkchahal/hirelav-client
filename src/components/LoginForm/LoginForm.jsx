import './LoginForm.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AUTH_URL, getUserInfo } from '../../utils/APIUtlis';
import axios from 'axios';

function LoginForm(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post(`${AUTH_URL}/login`, {
                email: email,
                password: password,
            })
            .then(res => {
                let token = res.data.authToken;
                if (token) {
                    getUserInfo(token);
                    sessionStorage.setItem('authToken', token);
                    history.push('/profile');
                } else {
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <form action="submit" onSubmit={handleLogin}>
                <label>Email Address
                    <input
                        type="email"
                        placeholder="email"
                        autoComplete="username"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label>Password
                    <input
                        type="password"
                        placeholder="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;