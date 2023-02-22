'use client';

import { useState } from "react";
import { pb } from "@/helpers/dbconnect";
import { useRouter } from 'next/navigation';
import Image from "next/legacy/image";
import '../styles/RestaurantItem.scss';

export default function RestaurantItem({ restaurant, user, newView, recView, savedView, savedRestaurant }: any) {
  const [openOptions, setOpenOptions] = useState(false);
  const [clipboardCopy, setClipboardCopy] = useState(false);

  const restaurantUser = restaurant.expand.user_id;
  const loggedInUser = pb.authStore.model;
  
  const router = useRouter();

  function handleToggleOptions() {
    setClipboardCopy(false);
    openOptions ? setOpenOptions(false) : setOpenOptions(true); 
  }

  async function handleDeleteRestaurant() {
    await pb.collection('restaurants').delete(restaurant.id);
    if (recView) return router.push(`/${user.username}`);
    router.refresh();
  }
  
  function handleShareRestaurant() {
    navigator.clipboard.writeText(`http://localhost:3000/${user.username}/${restaurant.id}`)
    setClipboardCopy(true);
    setTimeout(() => {
      setClipboardCopy(false);
    }, 3000);
  }

  async function handleSaveRestaurant() {
    if (!loggedInUser) {
      return router.push('/login');
    }

    if (savedRestaurant === null) {
      const data = {
        "user_id": loggedInUser.id,
        "restaurant_id": restaurant.id
    };
    
      await pb.collection('saved_rec_lists').create(data);
      return window.location.reload();
    }

    await pb.collection('saved_rec_lists').delete(savedRestaurant.id);
    return window.location.reload();
  }

  const restaurantImage = {
    background: `linear-gradient(#0000008a, #000000a7
      ), center/cover url('${restaurant.image ? restaurant.image : null}')`
  }

  return (
    <div className='RestaurantItem' style={restaurant.image ? restaurantImage : {}}>
      <div className='title-container'>
        {recView && <h4 className="recView">
          <a href={`/${user.username}`}><strong>
              @{user.username}&apos;s
          </strong></a> favourites at
        </h4>}
        {restaurantUser && savedView && <h4 className="recView">
          <a href={`/${restaurantUser.username}`}><strong>
              @{restaurantUser.username}&apos;s
          </strong></a> favourites at
        </h4>}
        <div className='sub-title-container'>
          {!newView && <a className="title" href={`/${user.username}/${restaurant.id}`}>
            <h1>{restaurant.name}</h1>
            {restaurant.address && <h4>{restaurant.address}</h4>}
          </a>}
          {newView && <div className="title">
            <h1>{restaurant.name}</h1>
            {restaurant.address && <h4>{restaurant.address}</h4>}
          </div>}
          {!newView && <div className="options" onClick={handleToggleOptions}>
            <Image
              src='/dots.png'
              alt='options'
              width={26}
              height={7}
            />
          </div>}
        </div>
      </div>
      <div className='star-container'>
        {!openOptions && <>
          <div className='star-item'>
            <p>{restaurant.one_stars}</p>
            <Image src='/one-star.png' alt='one-stars' width={22} height={22}/>
          </div>
          <div className='star-item'>
            <p>{restaurant.two_stars}</p>
            <Image src='/two-star.png' alt='two-stars' width={33} height={41}/>
          </div>
          <div className='star-item'>
            <p>{restaurant.three_stars}</p>
            <Image src='/three-star.png' alt='three-stars' width={43} height={41}/>
          </div>
        </>}
        {openOptions && <>
          <div className="share option-item" onClick={handleShareRestaurant}>
            {clipboardCopy ? "Clipboarded!" : "Share"}
          </div>
          {((loggedInUser && (restaurant.user_id !== loggedInUser.id)) || !loggedInUser) &&
          <div className="save option-item" onClick={handleSaveRestaurant}>
            {savedRestaurant ? "Unsave" : "Save"}
          </div>}
          {(loggedInUser && (restaurant.user_id === loggedInUser.id)) && <div className="delete option-item" onClick={handleDeleteRestaurant}>
            Delete
          </div>}
        </>}
      </div>
    </div>
  );
}
