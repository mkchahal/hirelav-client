import './LoginForm.scss';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AUTH_URL, getUserInfo } from '../../utils/APIUtils';
import axios from 'axios';
import { Form, Segment, Message } from 'semantic-ui-react';

function LoginForm(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState('');
    const errDisplay = errorMsg.length !== 0 ? 'flex' : 'none';

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
                    console.log(res.data.message);
                    setErrorMsg(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='login-form'>
            <h1>Log-in to your account</h1>
            <Form size='large' action="submit" onSubmit={handleLogin} error>
                <Segment className='login-form__card'>
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
                        style={{display: `${errDisplay}`}}
                        error
                        header='Error Logging In'
                        content={errorMsg}
                    />
                    <button type='submit'>
                        Login
                    </button>
                </Segment>
            </Form>
            <Message className='login-form__card'>
                New to us? <Link to='/register'>Sign Up</Link>
            </Message>
        </div>
    )
}

export default LoginForm;