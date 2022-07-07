import React, { Component } from 'react';
import './SignUp.scss';
import { AUTH_URL } from '../../utils/APIUtils';
import axios from 'axios';
import { Form, Input } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

class SignUpPage extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleSignUp = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        axios
            .post(`${AUTH_URL}/signup`, newUser)
            .then(res => {
                if (res.status === 201) {
                    Swal.fire({
                        title: 'User Created',
                        text: 'New profile created. Redirecting to Login Page.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(history.push('/login'));
                }
            })
            .catch(err => console.log(err));
    }

    render() {

        const { firstName, lastName, username, email, password, confirmPassword } = this.state;

        return (
            <div className='signup-form__wrapper'>
                <div className='signup-form'>
                    <div className='signup-form__header'>
                        <h1>Join us today</h1>
                        <p>Enter your details below to register</p>
                    </div>
                    <Form action="submit" onSubmit={this.handleSignUp}>
                        <div className='signup-form__card'>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-first-name'
                                    control={Input}
                                    label='First name'
                                    placeholder='First name'
                                    value={firstName}
                                    onChange={e => this.setState({ firstName: e.target.value })}
                                />
                                <Form.Field
                                    id='form-input-control-last-name'
                                    control={Input}
                                    label='Last name'
                                    placeholder='Last name'
                                    value={lastName}
                                    onChange={e => this.setState({ lastName: e.target.value })}
                                />
                                <Form.Field
                                    id='form-input-control-username'
                                    control={Input}
                                    label='Username'
                                    placeholder='Username'
                                    value={username}
                                    onChange={e => this.setState({ username: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Input
                                label='Email'
                                placeholder='joe@schmoe.com'
                                value={email}
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    label='Password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                />
                                <Form.Field
                                    control={Input}
                                    label='Confirm Password'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={e => this.setState({ confirmPassword: e.target.value })}
                                />
                            </Form.Group>
                            <button className='signup-form__button' type='submit'>
                                Create Profile
                            </button>
                            <p className='signup-form__message'>Already have an account?
                                <Link to='/login'><strong>&nbsp;Login</strong></Link>
                            </p>
                        </div>
                    </Form>
                </div>
                <p className='signup-form__footer'>© 2022, made with ♥ by <strong>Mandeep K Chahal</strong>.</p>
            </div >
        )
    }
}

export default withRouter(SignUpPage);

