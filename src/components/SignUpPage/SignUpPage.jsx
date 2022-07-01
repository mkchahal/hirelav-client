import React, { Component } from 'react';
import { AUTH_URL } from '../../utils/APIUtils';
import axios from 'axios';
import '../LoginForm/LoginForm.scss';
import { Form, Input, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class SignUpPage extends Component {
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
                    console.log("User Created Succesfully");
                    //TODO: Insert SweetAlert Here
                    this.props.history.push('/profile');
                }
            })
            .catch(err => console.log(err));
    }

    render() {

        const { firstName, lastName, username, email, password, confirmPassword } = this.state;
        return (
            <div className='login-form'>
                <Segment>
                    <Form action="submit" onSubmit={this.handleSignUp} className='login-form__card'>
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
                        <button>Create Profile</button>
                    </Form>
                </Segment>
                <Message className='login-form__card'>
                    Already have an account? <Link to='/register'>Login</Link>
                </Message>
            </div >
        )
    }
}

