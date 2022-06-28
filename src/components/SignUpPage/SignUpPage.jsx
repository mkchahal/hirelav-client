import React, { Component } from 'react';
import { AUTH_URL } from '../../utils/APIUtlis';
import axios from 'axios';
import '../LoginForm/LoginForm.scss';

export default class SignUpPage extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
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
                if(res.status === 201) {
                    console.log("User Created Succesfully");
                    //TODO: Insert SweetAlert Here
                    this.props.history.push('/profile');
                }
            })
            .catch(err => console.log(err));
    }

    render() {

        const { firstName, lastName, username, email, password } = this.state;
        return (
            <>
                <div>
                    <form action="submit" onSubmit={this.handleSignUp}>
                        <label>First Name
                            <input
                                type="text"
                                placeholder="firstName"
                                value={firstName}
                                onChange={e => this.setState({firstName: e.target.value})}
                            />
                        </label>
                        <label>Last Name
                            <input
                                type="text"
                                placeholder="lastName"
                                value={lastName}
                                onChange={e => this.setState({lastName: e.target.value})}
                            />
                        </label>
                        <label>Username
                            <input
                                type="text"
                                placeholder="username"
                                value={username}
                                onChange={e => this.setState({username: e.target.value})}
                            />
                        </label>
                        <label>Email Address
                            <input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={e => this.setState({email: e.target.value})}
                            />
                        </label>
                        <label>Password
                            <input
                                type="password"
                                placeholder="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={e => this.setState({password: e.target.value})}
                            />
                        </label>
                        <button>Create Profile</button>
                    </form>
                </div>
            </>
        )
    }
}

