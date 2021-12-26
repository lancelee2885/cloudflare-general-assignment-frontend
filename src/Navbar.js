import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light justify-content-center text-center" >
        <ul className="navbar-nav text-center">
          <li className="navbar-brand text-center"><NavLink to="/">Posts</NavLink></li>
          <li className="navbar-brand text-center"><NavLink to="/add">Add Post</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar