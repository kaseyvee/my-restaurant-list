import { pb } from "@/helpers/dbconnect";
import getSavedRestaurants from "@/helpers/getSavedRestaurants";
import Image from "next/image";

import '../../../styles/Profile.scss';

import RestaurantList from "@/components/RestaurantList";
import ShareProfileButton from "@/components/ShareProfileButton";
import ProfileNav from "@/components/ProfileNav";

export default async function Profile({ params }: any) {
  const user = await pb.collection('users').getFirstListItem(`username="${params.username}"`);
  const savedRestaurants = await getSavedRestaurants(user.id);

  const processedSavedRestaurants = savedRestaurants.map(restaurant => {
    return restaurant.expand.restaurant_id;
  })
  
  return (
    <div className='Profile'>
      <div className='profile-header'>
        <Image src={user.avatar} alt='avatar' width={120} height={120}/>
        <div className='section-right'>
          <h2>@{user.username}</h2>
          <ShareProfileButton user={user} />
        </div>
      </div>
      <ProfileNav saved={true} user={user}/>
      <div className='restaurants-container'>
        <h1>{user.username} needs to try these out</h1>
        <RestaurantList
          user={user}
          userRestaurants={processedSavedRestaurants}
        />
      </div>
    </div>
  )
}