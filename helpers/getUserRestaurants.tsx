import { pb } from "./dbconnect";

export default async function getUserRestaurants(userId: string) {
  try {
    const userRestaurants = await pb.collection('restaurants').getList(1, 50, {
      filter: `user_id = "${userId}"`,
      sort: '-updated',
    });
    return userRestaurants.items;
  } catch(err) {
    return [];
  }
}