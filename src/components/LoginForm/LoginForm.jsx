import './LoginForm.scss';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AUTH_URL, getUserInfo } from '../../utils/APIUtils';
import axios from 'axios';
import { Form, Message } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState('');
    const errDisplay = errorMsg.length !== 0 ? 'flex' : 'none';

    const history = useHistory();
    const dispatch = useDispatch();

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
                    dispatch(login({
                        email: email,
                        password: password,
                        loggedIn: true
                    }))
                    history.push('/profile');
                } else {
                    console.log(res.data.message);
                    setErrorMsg(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='login-form__wrapper'>
            <div className='login-form'>
                <div className='login-form__header'>
                    <h1>Sign In</h1>
                    <p>Enter your email and password to Sign In</p>
                </div>
                <Form size='large' action="submit" onSubmit={handleLogin} error>
                    <div className='login-form__card'>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            label='Email Address'
                            value={email}
                            placeholder='E-mail address'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            label='Password'
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Message
                            style={{ display: `${errDisplay}` }}
                            size='mini'
                            error
                            header='Error Logging In'
                            content='Either the email or password is incorrect.'
                            floating
                        />
                        <button className='login-form__button' type='submit'>
                            Login
                        </button>
                        <p className='login-form__message'>Don't have an account?
                            <Link to='/register'><strong>&nbsp;Sign Up</strong></Link>
                        </p>
                    </div>
                </Form>
            </div>
            <p className='login-form__footer'>© 2022, made with ♥ by <strong>Mandeep K Chahal</strong>.</p>
        </div>
    )
}

export default LoginForm;