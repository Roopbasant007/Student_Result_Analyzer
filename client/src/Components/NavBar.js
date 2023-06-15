import React, { useState } from "react";
import "../App.css";
import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <h2>
            <span>S</span>tudent
            <span>R</span>esult
            <span>A</span>nalyser
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/addCourse">AddCourse</NavLink>
            </li>
            <li>
              <NavLink to="/copoMapping">CopoMapping</NavLink>
            </li>
            <li>
              <NavLink to="/upload">UploadMarks</NavLink>
            </li>
          </ul>
        </div>

       

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        
      </nav>

    </>
  );
};

export default NavBar;