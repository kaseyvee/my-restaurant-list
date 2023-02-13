'use client';

import { useState } from 'react';
import Image from "next/legacy/image";
import '../styles/Nav.scss';

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);

  const avatarStyles = {
    bottom: '14rem'
  };

  function handleNavToggle() {
    openNav ? setOpenNav(false) : setOpenNav(true);
  };

  return (
    <div className='Nav'>
      <button
        className='avatar'
        style={openNav ? avatarStyles : {}}
        onClick={handleNavToggle}
      >
        <Image src='https://i.imgur.com/NAUj82l.jpg' alt='avatar' width={50} height={50}/>
      </button>
      {openNav &&
      <div className='nav-container'>
        <div className='nav-item new-rec'>
          New Recommendation
        </div>
        <div className='nav-item'>
          My Profile
        </div>
        <div className='nav-item'>
          Saved Recommendations
        </div>
        <div className='nav-item log-out'>
          Log Out
        </div>
      </div>}
    </div>
  );
}
