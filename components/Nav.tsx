'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import getLoggedInUser from '@/helpers/getLoggedInUser';
import Image from "next/image";
import '../styles/Nav.scss';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);

  const loggedInUser = getLoggedInUser();

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
        <Image src={loggedInUser ? loggedInUser.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} alt='avatar' width={50} height={50}/>
      </button>
      {openNav &&
      <div className='nav-container'>
        {loggedInUser ? 
          <>
            <div className='nav-item clickable new-rec'>
              New Recommendation
            </div>
            <a href={`/${loggedInUser.username}`} className='nav-item clickable'>
              My Profile
            </a>
            <div className='nav-item clickable'>
              Saved Recommendations
            </div>
            <div className='nav-item clickable log-out' onClick={handleLogOut}>
              Log Out
            </div>
          </>
          :
          <>
            <a href='/' className='nav-item clickable'>
              Home
            </a>
            <a href='/login' className='nav-item clickable'>
              Log In
            </a>
            <a href='/signup' className='nav-item clickable'>
              Sign Up
            </a>
            <a href='https://github.com/kaseyvee/my-restaurant-list' className='nav-item clickable'>
              GitHub
            </a>
          </>
        }
      </div>}
    </div>
  );
}
