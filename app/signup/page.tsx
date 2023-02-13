'use client';

import '../../styles/LogInSignUp.scss';
import Image from 'next/image';
import HomeForm from '../../components/HomeForm';
import PocketBase from 'pocketbase';
import ReactLoading from 'react-loading';
import { useState } from 'react';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    const data = {
        "username": "test_username",
        "email": "test@example.com",
        "emailVisibility": true,
        "password": "12345678",
        "passwordConfirm": "12345678",
        "avatar": "https://example.com"
    };
    const record = await pb.collection('users').create(data);
  };

  const loadingStyle = {
    justifyContent: 'center',
  };
  
  return (
    <div className='Form' style={loading ? loadingStyle : {}}>
     {loading ? 
        <ReactLoading type={"spinningBubbles"} color={"#ffffff"} width={80} />
      :
        <>
          <div className='title'>
            <h1>Sign Up</h1>
            <a href='/'><Image src='/../public/back.png' alt='back' width={58} height={58}/></a>
          </div>
          <HomeForm signup={true} />
          <button className='btn'>Sign Up</button>
        </>
      }
    </div>
  )
}