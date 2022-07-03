import React from "react";
import './Sidebar.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiHomeHeart, BiSearchAlt } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { ImClipboard } from 'react-icons/im';
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

function Sidebar({ view }) {
  const viewProp = view ? 'show' : 'hide';
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = e => {
    e.preventDefault();

    dispatch(logout()); 
    history.push('/');
  }

  return (
    <div className={`sidebar--${viewProp}`}>
      <div className="sidebar__links">
        <NavLink to='/profile'>
          <BiHomeHeart />
          Home
        </NavLink>
        <NavLink to='/profile/board'>
          <ImClipboard />
          Task Board
        </NavLink>
        <NavLink to='/profile/jobs'>
          <BiSearchAlt />
          Job Postings
        </NavLink>
        <NavLink to='/profile/apps'>
          <BsPeople />
          Applications
        </NavLink>
        <NavLink to='/profile'>
          <AiOutlineSetting />
          Settings
        </NavLink>
      </div>
      <button onClick={e => handleLogout(e)}>Log Out</button>
    </div>
  );
}



export default Sidebar;
