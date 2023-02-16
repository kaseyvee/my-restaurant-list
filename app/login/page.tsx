import '../../styles/LogInSignUp.scss';

import FormTitle from '@/components/FormTitle';
import HomeForm from '@/components/HomeForm';


export default function LogIn() {

  return (
    <div className='Form'>
      <FormTitle text="Log In" redirect='/'/>
      <HomeForm/>
    </div>
  )
}