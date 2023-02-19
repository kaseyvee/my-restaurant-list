import Image from 'next/image';

export default function FormTitle(props: any) {

  return (
    <div className='FormTitle title'>
      <h1>{props.text}</h1>
      <a href={props.redirect} className='clickable'><Image src='/back.png' alt='back' width={50} height={50}/></a>
    </div>
  )
}