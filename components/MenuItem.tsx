'use client'

import { useRouter } from 'next/navigation';
import { pb } from '@/helpers/dbconnect';
import '../styles/MenuItem.scss'
import Image from "next/legacy/image";
import { useEffect, useState } from 'react';

export default function MenuItem({ menuItem, user }: any) {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    if (pb.authStore.isValid) {
      setLoggedInUser(pb.authStore.model);
    }
  }, [])
  
  async function handleDeleteItem() {
    await pb.collection('menu_items').delete(menuItem.id);
    router.refresh();
  }

  function getStars() {
    if (menuItem.rating === 3) {
      return (
        <Image src='/three-star.png' alt='three-stars' width={43} height={41}/>
      )
    }
    if (menuItem.rating === 2) {
      return (
        <Image src='/two-star.png' alt='two-stars' width={33} height={41}/>
      )
    }
    if (menuItem.rating === 1) {
      return (
        <Image src='/one-star.png' alt='one-stars' width={22} height={22}/>
      )
    }
  };
  
  return (
    <div className='MenuItem'>
      {menuItem.image && <Image src={menuItem.image} alt='menu-item' width="900" height="500" objectFit='cover'/>}
      <div className='bottom-card'>
        <div className='title'>
          <h1>
            {menuItem.name}
          </h1>
          <div className='rating'>
            {getStars()}
          </div>
        </div>
        <p>{menuItem.notes}</p>
        {(loggedInUser && loggedInUser.id === user.id) && <div className='delete' onClick={handleDeleteItem}>Delete</div>}
      </div>
    </div>
  );
}
