import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="nav-container">

      <NavLink to="/" className="nav-item">
        <div className="nav-number">1</div>
        <p className="nav-label">Profile Section</p>
      </NavLink>

      <hr className="nav-line" />

      <NavLink to="/education" className="nav-item">
        <div className="nav-number">2</div>
        <p className="nav-label">Education Section</p>
      </NavLink>

      <hr className="nav-line" />

      <NavLink to="/skill" className="nav-item">
        <div className="nav-number">3</div>
        <p className="nav-label">Skill Sector</p>
      </NavLink>

      <hr className="nav-line" />

      <NavLink to="/experience" className="nav-item">
        <div className="nav-number">4</div>
        <p className="nav-label">Experience</p>
      </NavLink>

      <hr className="nav-line" />

      <NavLink to="/projects" className="nav-item">
        <div className="nav-number">5</div>
        <p className="nav-label">Projects</p>
      </NavLink>
      
      <hr className="nav-line" />

      <NavLink to="/social" className="nav-item">
        <div className="nav-number">6</div>
        <p className="nav-label">Social</p>
      </NavLink>

    </div>
  )
}

export default Navbar