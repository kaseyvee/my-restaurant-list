'use client';

import { useState } from "react";
import { pb } from "@/helpers/dbconnect";
import { useRouter } from 'next/navigation';
import Image from "next/legacy/image";
import '../styles/RestaurantItem.scss';

export default function RestaurantItem({ restaurant, user, newView, recView }: any) {
  const [openOptions, setOpenOptions] = useState(false);
  const [clipboardCopy, setClipboardCopy] = useState(false);

  const router = useRouter();

  function handleToggleOptions() {
    setClipboardCopy(false);
    openOptions ? setOpenOptions(false) : setOpenOptions(true); 
  }

  async function handleDeleteRestaurant() {
    await pb.collection('restaurants').delete(restaurant.id);
    router.refresh();
  }

  
  function handleShareRestaurant() {
    navigator.clipboard.writeText(`http://localhost:3000/${user.username}/${restaurant.id}`)
    setClipboardCopy(true);
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
        <div className='sub-title-container'>
          {!newView && <a className="title" href={`/${user.username}/${restaurant.id}`}>
            <h1>{restaurant.name}</h1>
            {restaurant.address && <h4>{restaurant.address}</h4>}
          </a>}
          {newView && <div className="title">
            <h1>{restaurant.name}</h1>
            {restaurant.address && <h4>{restaurant.address}</h4>}
          </div>}
          <div className="options">
            <Image
              src='/dots.png'
              alt='options'
              width={26}
              height={7}
              onClick={handleToggleOptions}
            />
          </div>
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
            {clipboardCopy ? "Copied to clipboard!" : "Share"}
          </div>
          <div className="delete option-item" onClick={handleDeleteRestaurant}>
            Delete
          </div>
        </>}
      </div>
    </div>
  );
}
