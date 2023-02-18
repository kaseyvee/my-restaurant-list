import { pb } from "./dbconnect";

export default async function getSavedRestaurants(userId: string) {
  const savedRestaurants = await pb.collection('saved_rec_list').getList(1, 50, {
    filter: `user_id = "${userId}"`,
    sort: '-created',
  });

  return savedRestaurants.items;
}