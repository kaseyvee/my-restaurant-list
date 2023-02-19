import { pb } from '@/helpers/dbconnect';
import MenuItem from '@/components/MenuItem';
import RestaurantItem from '@/components/RestaurantItem';
import '../../../styles/Menu.scss';

export default async function Menu({ params }: any) {
  const restaurant = await pb.collection('restaurants').getOne(params.restaurantId);
  const user = await pb.collection('users').getOne(restaurant.user_id);
  const menuItems = await pb.collection('menu_items').getList(1, 50, {
    filter: `restaurant_id = "${params.restaurantId}"`,
    sort: '-created',
  });
  
  const menuItemList = menuItems.items.map((menuItem) => {
    return (
      <MenuItem key={menuItem.id} userId={restaurant.user_id} menuItem={menuItem}/>
    )
  });

  return (
    <div className='Menu'>
      <RestaurantItem view={true} user={user} restaurant={restaurant} recView={true}/>
      {menuItemList}
    </div>
  )
}