import Image from "next/image"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default async function Profile({ params }: any) {
  const user = await pb.collection('users').getOne(params.id);
  const resultList = await pb.collection('restaurants').getList(1, 50, {
    filter: `user_id = "${params.id}"`,
});

  return (
    <div className='Profile'>
      <div>
      <Image src={user.avatar} alt='avatar' width={120} height={120}/>
      <h1>{user.username}</h1>
      </div>
    </div>
  )
}