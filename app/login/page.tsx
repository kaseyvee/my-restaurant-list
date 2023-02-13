'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import Image from 'next/image';
import ReactLoading from 'react-loading';

import '../../styles/LogInSignUp.scss';

import HomeForm from '@/components/HomeForm';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function LogIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function handleLogIn() {
    setError('');

    if ((email.current && !email.current.value) || (password.current && !password.current.value)) {
      return setError("Please fill out all fields.");
    }

    setLoading(true);

    if (email.current && password.current) {
      const authData = await pb.collection('users').authWithPassword(
        email.current.value,
        password.current.value,
      );

      console.log("authData: ", authData);
      router.push(`/profile/${authData.record.id}`)
    }
  }

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
            <h1>Log In</h1>
            <a href='/'><Image src='/../public/back.png' alt='back' width={58} height={58}/></a>
          </div>
          <HomeForm
            email={email}
            password={password}
          />
          <button className='btn' type='submit' onClick={handleLogIn}>Log In</button>
          {error && <h2 className='error'>{error}</h2>}
        </>
      }
    </div>
  )
}