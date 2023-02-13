'use client';

import { useRef, useState } from 'react';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ReactLoading from 'react-loading';

import '../../styles/LogInSignUp.scss';

import HomeForm from '../../components/HomeForm';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const email = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirm = useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function handleSignUp() {
    setError('');

    if ((email.current && !email.current.value) || (username.current && !username.current.value) || (password.current && !password.current.value) || (passwordConfirm.current && !passwordConfirm.current)) {
      return setError("Please fill out all fields.");
    }

    if ((password.current && password.current.value) !== (passwordConfirm.current && passwordConfirm.current.value)) {
      return setError("Passwords are not the same.");
    }

    setLoading(true);

    const data = {
      "email": email.current && email.current.value,
      "username": username.current && username.current.value,
      "emailVisibility": true,
      "password": password.current && password.current.value,
      "passwordConfirm": passwordConfirm.current && passwordConfirm.current.value,
    };

    try {
      await pb.collection('users').create(data);
      router.push(`/login`)
    } catch(e) {
      setError("Email or username already exists.");
      setLoading(false);
      console.log(e)
    }
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
          <HomeForm
            signup={true}
            email={email}
            username={username}
            password={password}
            passwordConfirm={passwordConfirm}
          />
          <button className='btn' type='submit' onClick={handleSignUp}>Sign Up</button>
          {error && <h2 className='error'>{error}</h2>}
        </>
      }
    </div>
  )
}