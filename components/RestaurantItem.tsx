'use client';

import Image from "next/legacy/image";
import { useState } from "react";
import '../styles/RestaurantItem.scss';

export default function RestaurantItem({ restaurant, user, view }: any) {
  const [openOptions, setOpenOptions] = useState(false);
  const [clipboardCopy, setClipboardCopy] = useState(false);

  function handleToggleOptions() {
    setClipboardCopy(false);
    openOptions ? setOpenOptions(false) : setOpenOptions(true); 
  }

  async function handleDeleteRestaurant() {
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
        <a className="title" href={`/${user.username}/${restaurant.id}`}>
          <h1>{restaurant.name}</h1>
          {restaurant.address && <h4>{restaurant.address}</h4>}
        </a>
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
          <div className="delete option-item">
            Delete
          </div>
        </>}
      </div>
    </div>
  );
}
