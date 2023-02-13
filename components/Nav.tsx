'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import Image from "next/image";
import '../styles/Nav.scss';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);

  const router = useRouter();

  const avatarStyles = {
    bottom: '14rem'
  };

  function handleNavToggle() {
    openNav ? setOpenNav(false) : setOpenNav(true);
  };

  function handleLogOut() {
    pb.authStore.clear();
    router.push(`/login`)
  }

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
        <div className='nav-item clickable new-rec'>
          New Recommendation
        </div>
        <div className='nav-item clickable'>
          My Profile
        </div>
        <div className='nav-item clickable'>
          Saved Recommendations
        </div>
        <div className='nav-item clickable log-out' onClick={handleLogOut}>
          Log Out
        </div>
      </div>}
    </div>
  );
}
