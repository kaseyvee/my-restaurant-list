import '../../styles/LogInSignUp.scss';
import Image from 'next/image';
import HomeForm from '../../components/HomeForm';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// example create data

export default function SignUp() {
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
  }
  return (
    <div className='Form'>
      <div className='title'>
        <h1>Sign Up</h1>
        <a href='/'><Image src='/../public/back.png' alt='back' width={58} height={58}/></a>
      </div>
      <HomeForm signup={true} />
      <button className='btn'>Sign Up</button>
    </div>
  )
}