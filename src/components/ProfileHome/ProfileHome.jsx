import React from 'react';
import './ProfileHome.scss';

export default function ProfileHome({ view }) {
  return (
    <div className={view ? 'home' : 'home--expanded'}>Hello</div>
  )
}
