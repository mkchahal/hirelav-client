import React, { Component, useState } from 'react'
import { Icon, Search } from 'semantic-ui-react';
import logo from '../../assets/logos/hirelav.png';
import './ProfileHeader.scss';

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
        <img src={logo} alt="logo" />
        <button onClick={() => {
          setView(!view)
        }} className='profile-nav__mini'><Icon name='bars' size='large' /></button>
        <Search input={{ icon: 'search', iconPosition: 'left' }} />
      </div>
      <div className="profile-nav__right">
        <button className='profile-nav__mini'><Icon name='bell outline' size='large' /></button>
        <button className='profile-nav__user'>
          <img src='https://t3.ftcdn.net/jpg/02/52/62/04/360_F_252620498_MTwvbrwAtAnrj0dGiNrxXsfUTdf9w5E8.jpg' alt="user" />
          <Icon name='setting' size='large' />
        </button>
      </div>
    </div>
  )
}
