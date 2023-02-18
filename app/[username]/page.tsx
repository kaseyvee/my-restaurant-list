import { pb } from "@/helpers/dbconnect";
import Image from "next/image";
import '../../styles/Profile.scss';
import RestaurantItem from '@/components/RestaurantItem';
import getUserRestaurants from "@/helpers/getUserRestaurants";
import getSavedRestaurants from "@/helpers/getSavedRestaurants";

export default async function Profile({ params }: any) {
  const user = await pb.collection('users').getFirstListItem(`username="${params.username}"`);
  const userRestaurants = await getUserRestaurants(user.id);

  const loggedInUser: any = pb.authStore.model || null;
  let savedRestaurants: any = [];
  if (loggedInUser) {
    savedRestaurants = await getSavedRestaurants(loggedInUser.id);
  }
  
  function checkSavedRestaurants(restaurantId: string) {
    const foundRestaurant = savedRestaurants.find((restaurant: any) => restaurant.restaurant_id === restaurantId);

    if (foundRestaurant) return foundRestaurant;
    return null;
  }

  const restaurantList = userRestaurants.map((restaurant) => {
    return (
      <RestaurantItem savedRestaurant={checkSavedRestaurants(restaurant.id)} key={restaurant.id} restaurant={restaurant} user={user}/>
    )
  })

  return (
    <div className='Profile'>
      <div className='profile-header'>
        <Image src={user.avatar} alt='avatar' width={120} height={120}/>
        <div className='section-right'>
          <h2>@{user.username}</h2>
          <button className='btn'>
            Share Profile
          </button>
        </div>
      </div>
      <div className='profile-nav'>
        <div className='profile-nav-item newest'>
          Favourites
        </div>
        <div className='profile-nav-item'>
          Saved
        </div>
      </div>
      <div className='restaurants-container'>
        <h1>{user.username}&apos;s newest favourites</h1>
        {restaurantList}
      </div>
    </div>
  )
}