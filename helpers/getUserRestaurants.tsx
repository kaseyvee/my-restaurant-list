import { pb } from "./dbconnect";

export default async function getUserRestaurants(userId: string) {
  const userRestaurants = await pb.collection('restaurants').getList(1, 50, {
    filter: `user_id = "${userId}"`,
  });

  return userRestaurants.items;
}