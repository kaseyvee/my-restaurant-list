import '../styles/HomePage.scss';

export default function HomePage() {
  return (
    <div className='HomePage'>
      <h1>EatThis</h1>
      <div className='btns-container'>
        <button className='btn'>
          Log In
        </button>
        <button className='btn'>
          Sign Up
        </button>
      </div>
    </div>
  )
}