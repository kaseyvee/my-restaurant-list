import Image from 'next/image';
import HomeForm from '@/components/HomeForm';

import '../../styles/LogInSignUp.scss';

export default function LogIn() {

  return (
    <div className='Form'>
      <div className='title'>
        <h1>Log In</h1>
        <a href='/' className='clickable'><Image src='/../public/back.png' alt='back' width={58} height={58}/></a>
      </div>
      <HomeForm/>
    </div>
  )
}