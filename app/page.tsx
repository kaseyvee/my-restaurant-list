'use client'

import '../styles/HomePage.scss';

export default function HomePage() {
  return (
    <div className='HomePage'>
      <h1>untitled yum yum app</h1>
      <div className='btns-container'>
        <button className='btn' onClick={() => window.location.href='/login'}>
          Log In
        </button>
        <button className='btn' onClick={() => window.location.href='/signup'}>
          Sign Up
        </button>
      </div>
    </div>
  )
}