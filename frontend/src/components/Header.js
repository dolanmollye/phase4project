import React from 'react';
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="nav-bar">
      <div className="btn-div"> Account </div>
      <Link to='/notes' className="btn-div" style={{ textDecoration: 'none', color: 'white'}}> Notes </Link>
      {/* <Link className="btn-div"> New Note </div> */}
      <div className="btn-div"> Log Out </div>
    </div>
  );
}

export default Header;
