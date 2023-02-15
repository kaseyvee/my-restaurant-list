'use client'

import getLoggedInUser from '@/helpers/getLoggedInUser';
import '../styles/HomePage.scss';

export default function HomePage() {

  const loggedInUser = getLoggedInUser();

  return (
    <div className='HomePage'>
      <h1>untitled yum yum app</h1>
      <div className='btns-container'>
        {loggedInUser ?
          <>
            <button className='btn clickable' onClick={() => window.location.href='/new'}>New Recommendation</button>
          </>
          :
          <>
            <button className='btn clickable' onClick={() => window.location.href='/login'}>
              Log In
            </button>
            <button className='btn clickable' onClick={() => window.location.href='/signup'}>
              Sign Up
            </button>
          </>
        }
      </div>
    </div>
  )
}