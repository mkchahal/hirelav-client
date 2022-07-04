import React, { useState } from 'react';
import './Navbar.scss';
import logo from '../../assets/logos/hirelav.png';
export default function Navbar() {

    const [nav, setNav] = useState(false);
    const path = window.location.pathname.slice(1);

    const changeBackground = () => {
        if(window.scrollY >= 50) { 
            setNav(true);
        } else {
            setNav(false);
        }
    }

    window.addEventListener('scroll', changeBackground);

  return (
    <nav className={nav ? 'nav nav__active' : 'nav'}>
        <a href='/' className='logo'>
            <img src={logo} alt="hirelav logo" />
        </a>
        <input type="checkbox" className='menu-btn' id='menu-btn' /> 
        <label className='menu-icon' htmlFor="menu-btn">
            <span className='nav-icon'></span>
        </label>
        <ul className="menu">
            <li><a href="/" className={path === '' ? 'link--active' : ''}>Home</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Job Openings</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="/login" className={path === 'login' ? 'link--active' : ''}>Log In</a></li>
            <li><a href="/register" className={path === 'register' ? 'link--active' : ''}>Sign Up</a></li>
        </ul>
    </nav>
  )
}
