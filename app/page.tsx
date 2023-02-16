'use client'

import { pb } from '@/helpers/dbconnect';
import { useEffect, useState } from 'react';
import '../styles/HomePage.scss';

export default function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState<any>(null) 

  useEffect(() => {
    if (pb.authStore.isValid) {
      setLoggedInUser(pb.authStore.model);
    }
  }, [])

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