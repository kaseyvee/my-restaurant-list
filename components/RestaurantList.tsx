'use client';

import { useEffect, useState } from "react";
import { pb } from "@/helpers/dbconnect";
import getSavedRestaurants from "@/helpers/getSavedRestaurants";
import RestaurantItem from "./RestaurantItem"

export default function RestaurantList({ user, userRestaurants, savedView, recView }: any) {
  const [savedRestaurants, setSavedRestaunts] = useState([]);
  const loggedInUser = pb.authStore.model;

  useEffect(() => {
    if (loggedInUser) {
      getSavedRestaurants(loggedInUser.id)
        .then((fetchedSavedRestaurants: any) => setSavedRestaunts(fetchedSavedRestaurants))
    }
  }, [])

  function checkSavedRestaurants(restaurantId: string) {
    const foundRestaurant = savedRestaurants.find((restaurant: any) => restaurant.restaurant_id === restaurantId);

    if (foundRestaurant) return foundRestaurant;
    return null;
  }

  const restaurantList = userRestaurants.map((restaurant: any) => {
    return (
      <RestaurantItem
        key={restaurant.id}
        savedRestaurant={checkSavedRestaurants(restaurant.id)}
        restaurant={restaurant}
        user={user}
        savedView={savedView ? true : false}
        recView={recView ? true : false}
      />
    )
  })

  return (
    <>
    {restaurantList}
    </>
  )
}