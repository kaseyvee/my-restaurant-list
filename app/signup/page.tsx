import '../../styles/LogInSignUp.scss';

import FormTitle from '@/components/FormTitle';
import HomeForm from '../../components/HomeForm';

export default function SignUp() {
  return (
    <div className='Form'>
      <FormTitle text="Sign Up" redirect='/'/>
      <HomeForm signup={true}/>
    </div>
  )
}