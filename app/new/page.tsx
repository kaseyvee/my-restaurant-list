'use client';

import { pb } from "@/helpers/dbconnect";
import getUserRestaurants from "@/helpers/getUserRestaurants";
import { useEffect, useState } from "react";
import RestaurantItem from "@/components/RestaurantItem";

export default function New() {
  const [restaurants, setRestaurants] = useState<any>([]);

  useEffect(() => {
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
      <button className="btn clickable">New Restaurant</button>
      {restaurantList}
    </div>
  );
}
