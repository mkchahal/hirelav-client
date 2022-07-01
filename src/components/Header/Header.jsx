import React from "react";
import './Header.scss';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logos/hirelav.png';

export default function Header() {
    return (
        <div className="nav-header">
            <Link to='/'><img src={logo} alt="hirelav logo" className="nav-header__logo" /></Link>
            <div className="nav-header--right">
                <Link to='/login'>
                    <button className="nav-header__btn--login">
                        <Icon fitted name='sign in' /> {' '}
                        Login
                    </button>
                </Link>
                <Link to='/register'>
                    <button className="nav-header__btn--signup">
                        <Icon fitted name='signup' /> {' '}
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    )
}