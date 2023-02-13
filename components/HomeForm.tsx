import '../styles/HomeForm.scss';

export default function HomeForm(props: any) {
  return (
    <div className='HomeForm'>
      <form onSubmit={props.onSubmit}>
        <input ref={props.email} type='email' id='email' placeholder='Email'/>
        {props.signup && <input ref={props.username} type='text' id='username' placeholder='Username'/>}
        <input ref={props.password} type='password' id='password' placeholder='Password'/>
        {props.signup && <input ref={props.passwordConfirm} type='password' id='password-confirm' placeholder='Re-enter Password'/>}
        <button className='btn clickable' type='submit'>{props.signup ? "Sign Up" : "Log In"}</button>
      </form>
    </div>
  )
}