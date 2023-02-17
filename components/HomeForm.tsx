'use client';

import { pb } from '@/helpers/dbconnect';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';

export default function HomeForm(props: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const passwordConfirm = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (pb.authStore.isValid) {
      const loggedInUser: any = pb.authStore.model;
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
        router.push(`/${authData.record.username}`);
      } catch(e) {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }
  }

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
      "username": username.current && username.current.value.toLowerCase(),
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
    <>
      {loading ? 
        <ReactLoading type={"spinningBubbles"} color={"#ffffff"} width={80} />
      :
        <div className='HomeForm' style={loading ? loadingStyle : {}}>
          <form onSubmit={e => {
            props.signup ? handleSignUp(e) : handleLogIn(e)
          }}>
            <input ref={email} type='email' id='email' placeholder='Email'/>
            {props.signup && <input ref={username} type='text' id='username' placeholder='Username'/>}
            <input ref={password} type='password' id='password' placeholder='Password'/>
            {props.signup && <input ref={passwordConfirm} type='password' id='password-confirm' placeholder='Re-enter Password'/>}
            <button className='btn clickable' type='submit'>{props.signup ? "Sign Up" : "Log In"}</button>
          </form>
          {error && <h4 className='error'>{error}</h4>}
        </div>
      }
    </>
  )
}