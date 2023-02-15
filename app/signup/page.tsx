'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import getLoggedInUser from '@/helpers/getLoggedInUser';
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

  useEffect(() => {
    if (getLoggedInUser()) {
      const user = getLoggedInUser();
      router.push(`/${user.username}`);
    }
  }, []);

  async function handleSignUp(e: any) {
    e.preventDefault();
    setError('');

    if ((email.current && !email.current.value) || (username.current && !username.current.value) || (password.current && !password.current.value) || (passwordConfirm.current && !passwordConfirm.current)) {
      return setError("Please fill out all fields.");
    }

    if ((password.current && password.current.value) !== (passwordConfirm.current && passwordConfirm.current.value)) {
      return setError("Passwords are not the same.");
    }

    if (password.current) {
      if (password.current.value.length <= 7) {
        return setError("Password must be at least 8 characters long.")
      }
    }

    setLoading(true);

    const data = {
      "email": email.current && email.current.value,
      "username": username.current && username.current.value,
      "emailVisibility": true,
      "password": password.current && password.current.value,
      "passwordConfirm": passwordConfirm.current && passwordConfirm.current.value,
      "avatar": "https://i.pinimg.com/originals/48/e2/51/48e251739b188d1e7933d3b40dc37e14.png",
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
            onSubmit={(e: any) => handleSignUp(e)}
          />
          {error && <h4 className='error'>{error}</h4>}
        </>
      }
    </div>
  )
}