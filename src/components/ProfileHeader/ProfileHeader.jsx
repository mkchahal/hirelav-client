import React, { useState } from 'react'
import { Icon, Popup } from 'semantic-ui-react';
import logo from '../../assets/logos/logo.png';
import profile from '../../assets/images/profileMandeep.png';
import './ProfileHeader.scss';
import { Link } from 'react-router-dom';

export default function ProfileHeader({ view, setView }) {

  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  }

  window.addEventListener('scroll', changeBackground);

  return (
    <div className={nav ? 'profile-nav__active' : 'profile-nav'}>
      <div className="profile-nav__left">
        <Link to='/profile'><img src={logo} alt="logo" /></Link>
        <button onClick={() => {
          setView(!view)
        }}><Icon name='bars' size='large' /></button>
      </div>
      <div className="profile-nav__right">
          <Popup
            trigger={<button><Icon name='bell outline' size='large' /></button>}
            on='click'
            content='No new notifications! 🎉 '
            position='bottom right'
            basic
          />
        <button className='profile-nav__user'>
          <img src={profile} alt="user" />
          <Icon name='setting' size='large' />
        </button>
      </div>
    </div>
  )
}
