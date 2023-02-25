'use client';

import { useEffect, useState } from "react";
import { pb } from "@/helpers/dbconnect";
import { useRouter } from 'next/navigation';
import getUserRestaurants from "@/helpers/getUserRestaurants";
import '../../styles/New.scss';

import RestaurantItem from "@/components/RestaurantItem";
import AddButton from "@/components/AddButton";

export default function New() {
  const [restaurants, setRestaurants] = useState<any>([]);

  const loggedInUser: any = pb.authStore.model;
  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      return router.push('/login');
    }

    getUserRestaurants(loggedInUser.id)
      .then((restaurants) => setRestaurants(restaurants))
  }, [])

  const restaurantList = restaurants.map((restaurant: any) => {
    return (
      <a href={`/${loggedInUser.username}/${restaurant.id}/create`} key={restaurant.id}>
        <RestaurantItem restaurant={restaurant} user={loggedInUser} newView={true}/>
      </a>
    )
  })

  return (
    <div className='New'>
      <div className="header">
        <h1>New Recommendation</h1>
        <AddButton onClick={() => window.location.href='/new/restaurant'} text="Add New Restaurant"/>
      </div>
      <div className="restaurant-container">
        {restaurantList}
      </div>
    </div>
  );
}
