import React from "react";
import './Sidebar.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiHomeHeart, BiSearchAlt } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { ImClipboard } from 'react-icons/im';
import { VscSignOut } from 'react-icons/vsc';
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

function Sidebar({ view }) {
  const viewProp = view ? 'show' : 'hide';
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = e => {
    e.preventDefault();

    sessionStorage.clear();
    dispatch(logout());
    history.push('/');
  }

  return (
    <div className={`sidebar--${viewProp}`}>
      <div className="sidebar__links">
        <NavLink
          className='sidebar__link'
          activeClassName="sidebar__link--active"
          to='/profile' exact>
          <BiHomeHeart />
          Home
        </NavLink>
        <NavLink
          className='sidebar__link'
          activeClassName="sidebar__link--active"
          to='/profile/board'>
          <ImClipboard />
          Task Board
        </NavLink>
        <NavLink
          className='sidebar__link'
          activeClassName="sidebar__link--active"
          to='/profile/jobs'>
          <BiSearchAlt />
          Job Postings
        </NavLink>
        <NavLink
          className='sidebar__link'
          activeClassName="sidebar__link--active"
          to='/profile/apps'>
          <BsPeople />
          Applications
        </NavLink>
        <NavLink
          className='sidebar__link'
          activeClassName="sidebar__link--active"
          to='/profile/settings'>
          <AiOutlineSetting />
          Settings
        </NavLink>
      </div>
      <button
        className='sidebar__logout'
        onClick={e => handleLogout(e)}>
        <VscSignOut />
        Log Out
      </button>
    </div>
  );
}



export default Sidebar;
