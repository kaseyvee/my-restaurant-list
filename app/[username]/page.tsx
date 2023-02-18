import { pb } from "@/helpers/dbconnect";
import Image from "next/image";
import '../../styles/Profile.scss';
import RestaurantList from "@/components/RestaurantList";
import getUserRestaurants from "@/helpers/getUserRestaurants";

export default async function Profile({ params }: any) {
  const user = await pb.collection('users').getFirstListItem(`username="${params.username}"`);
  const userRestaurants = await getUserRestaurants(user.id);

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
        <RestaurantList
          user={user}
          userRestaurants={userRestaurants}
        />
      </div>
    </div>
  )
}