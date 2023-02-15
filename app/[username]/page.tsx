import PocketBase from 'pocketbase';
import Image from "next/image";
import '../../styles/Profile.scss';
import RestaurantItem from '@/components/RestaurantItem';

const pb = new PocketBase('http://127.0.0.1:8090');

export default async function Profile({ params }: any) {

  const user = await pb.collection('users').getFirstListItem(`username="${params.username}"`);
  const userRestaurants = await pb.collection('restaurants').getList(1, 50, {
    filter: `user_id = "${user.id}"`,
  });

  const restaurantList = userRestaurants.items.map((restaurant) => {
    return (
      <a href={`/${user.username}/${restaurant.id}`} key={restaurant.id}>
        <RestaurantItem restaurant={restaurant}/>
      </a>
    )
  })

  return (
    <div className='Profile'>
      <div className='profile-header'>
        <Image src={user.avatar} alt='avatar' width={120} height={120}/>
        <div className='section-right'>
          <h2>@{user.username}</h2>
          <button className='btn clickable'>
            Share Profile
          </button>
        </div>
      </div>
      <div className='profile-nav'>
        <div className='profile-nav-item newest'>
          Newest
        </div>
        <div className='profile-nav-item'>
          Closest
        </div>
      </div>
      <div className='restaurants-container'>
        <h1>{user.username}&apos;s newest favourites</h1>
        {restaurantList}
      </div>
    </div>
  )
}