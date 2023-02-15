import { pb } from "@/helpers/dbconnect";
import Image from "next/image";
import '../../styles/Profile.scss';
import RestaurantItem from '@/components/RestaurantItem';
import getUserRestaurants from "@/helpers/getUserRestaurants";


export default async function Profile({ params }: any) {

  const user = await pb.collection('users').getFirstListItem(`username="${params.username}"`);
  const userRestaurants = await getUserRestaurants(user.id);

  const restaurantList = userRestaurants.map((restaurant) => {
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