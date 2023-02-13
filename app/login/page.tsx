import '../../styles/LogInSignUp.scss';
import HomeForm from '@/components/HomeForm';
import Image from 'next/image';

export default function LogIn() {
  return (
    <div className='Form'>
      <div className='title'>
        <h1>Log In</h1>
        <a href='/'><Image src='/../public/back.png' alt='back' width={58} height={58}/></a>
      </div>
      <HomeForm />
      <button className='btn'>LogIn</button>
    </div>
  )
}