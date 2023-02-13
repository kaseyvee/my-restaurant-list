import '../styles/HomeForm.scss';

export default function HomeForm({ signup }: any) {
  return (
    <div className='HomeForm'>
      <form>
        <input type='email' id='email' placeholder='Email'/>
        <input type='password' id='password' placeholder='Password'/>
        {signup && <input type='password' id='password-confirm' placeholder='Re-enter Password'/>}
      </form>
    </div>
  )
}