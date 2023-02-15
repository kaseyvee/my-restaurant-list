'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { pb } from '@/helpers/dbconnect';
import getLoggedInUser from '@/helpers/getLoggedInUser';
import Image from 'next/image';
import ReactLoading from 'react-loading';

import '../../styles/LogInSignUp.scss';

import HomeForm from '@/components/HomeForm';


export default function LogIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (getLoggedInUser()) {
      const loggedInUser = getLoggedInUser();
      router.push(`/${loggedInUser.username}`);
    }
  }, []);

  async function handleLogIn(e: any) {
    e.preventDefault();
    setError('');

    if ((email.current && !email.current.value) || (password.current && !password.current.value)) {
      return setError("Please fill out all fields.");
    }

    setLoading(true);

    if (email.current && password.current) {
      try {
        const authData = await pb.collection('users').authWithPassword(
          email.current.value,
          password.current.value,
        );
        console.log("authData: ", authData);
        router.push(`/${authData.record.username}`)
        setLoading(false);

      } catch(e) {
        setError("Invalid email or password.");
        setLoading(false);
      }
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
            <a href='/' className='clickable'><Image src='/../public/back.png' alt='back' width={58} height={58}/></a>
          </div>
          <HomeForm
            email={email}
            password={password}
            onSubmit={(e: any) => handleLogIn(e)}
          />
          {error && <h4 className='error'>{error}</h4>}
        </>
      }
    </div>
  )
}