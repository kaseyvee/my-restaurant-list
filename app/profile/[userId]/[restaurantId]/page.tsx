import MenuItem from '@/components/MenuItem';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default async function Menu({ params }: any) {
  const restaurant = await pb.collection('restaurants').getOne(params.restaurantId);
  const menuItems = await pb.collection('menu_items').getList(1, 50, {
    filter: `restaurant_id = "${params.restaurantId}"`,
  });
  console.log(menuItems)

  return (
    <div className='Menu'>
      <MenuItem userId={restaurant.user_id} menuItem={menuItems.items[0]}/>
    </div>
  )
}