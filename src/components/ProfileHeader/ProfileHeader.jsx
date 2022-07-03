import React, { Component } from 'react'
import { Icon, Search } from 'semantic-ui-react';
import './ProfileHeader.scss';

export default class ProfileHeader extends Component {

  render() {

    return (
      <div className='profile-nav'>
        <div className="profile-nav__left">
          <p>HireLav</p>
          <button onClick={() => {
            this.props.setView(!this.props.view)
          }} className='profile-nav__mini'><Icon name='bars' size='large'/></button>
          <Search input={{ icon: 'search', iconPosition: 'left' }} />
        </div>
        <div className="profile-nav__right">
          <button className='profile-nav__mini'><Icon name='bell outline' size='large'/></button>
          <button className='profile-nav__user'>
            <img src='https://t3.ftcdn.net/jpg/02/52/62/04/360_F_252620498_MTwvbrwAtAnrj0dGiNrxXsfUTdf9w5E8.jpg' alt="user" />
            <Icon name='setting' size='large'/>
          </button>
        </div>
      </div>
    )
  }
}