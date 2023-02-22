import { pb } from "./dbconnect";

export default async function getSavedRestaurants(userId: string) {
  try {
    const savedRestaurants = await pb.collection('saved_rec_lists').getList(1, 50, {
      filter: `user_id = "${userId}"`,
      sort: '-created',
      expand: 'restaurant_id,restaurant_id.user_id',
    });
  
    return savedRestaurants.items;
  } catch(e) {
    return [];
  }
}