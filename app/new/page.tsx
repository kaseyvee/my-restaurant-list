'use client';

import { useEffect, useState } from "react";
import { pb } from "@/helpers/dbconnect";
import { useRouter } from 'next/navigation';
import getUserRestaurants from "@/helpers/getUserRestaurants";
import RestaurantItem from "@/components/RestaurantItem";

import '../../styles/New.scss';

export default function New() {
  const [restaurants, setRestaurants] = useState<any>([]);

  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      return router.push('/login');
    }

    const loggedInUser: any = pb.authStore.model;
    getUserRestaurants(loggedInUser.id)
      .then((restaurants) => setRestaurants(restaurants))
      .catch(e => console.log(e.message));
  }, [])

  const restaurantList = restaurants.map((restaurant: any) => {
    return (
      <a href={`/${restaurant.id}/create`} key={restaurant.id}>
        <RestaurantItem restaurant={restaurant}/>
      </a>
    )
  })

  return (
    <div className='New'>
      <div className="title">
        <h1>New Recommendation</h1>
        <button className="btn clickable">New Restaurant</button>
      </div>
      <div>
        {restaurantList}
      </div>
    </div>
  );
}
