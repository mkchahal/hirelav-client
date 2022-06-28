import React from "react";
import './Sidebar.scss';
import { RiFileCopyLine, RiUser2Fill } from "react-icons/ri";
import { FaSistrix, FaHome } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import avatar from "../../assets/images/profile.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={avatar} alt="avatar"/>
        <p className="sidebar__name">Mandeep K Chahal</p>
        <div className="sidebar__badge">Tech Recruiter</div>
      </div>
      <div className="sidebar__links-container">
        <div className="sidebar__links">
          <div className="sidebar__link">
            <FaHome />
            <h3>Home</h3>
          </div>
          <div className="sidebar__link">
            <RiFileCopyLine />
            <h3>Task Board</h3>
          </div>
          <div className="sidebar__link">
            <FaSistrix />
            <h3>Job Postings</h3>
          </div>
          <div className="sidebar__link">
            <RiUser2Fill />
            <h3>Applications</h3>
          </div>
          <div className="sidebar__link">
            <AiFillSetting />
            <h3>Settings</h3>
          </div>
        </div>
        <div className="sidebar__contact">
          <span>Having troubles?</span>
          <a href="/">Contact us </a>
        </div>
      </div>
    </div>
  );
}



export default Sidebar;
