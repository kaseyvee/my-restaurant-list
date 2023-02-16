
import Image from 'next/image';

import '../../styles/LogInSignUp.scss';

import HomeForm from '../../components/HomeForm';

export default function SignUp() {
  
  return (
    <div className='Form'>
      <div className='title'>
        <h1>Sign Up</h1>
        <a href='/'><Image src='/back.png' alt='back' width={58} height={58}/></a>
      </div>
      <HomeForm signup={true}/>
    </div>
  )
}