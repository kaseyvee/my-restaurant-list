import { pb } from '@/helpers/dbconnect';

import '../../../styles/Menu.scss';

import MenuItem from '@/components/MenuItem';
import RestaurantItem from '@/components/RestaurantItem';
import RestaurantList from '@/components/RestaurantList';

export default async function Menu({ params }: any) {
  const restaurant = await pb.collection('restaurants').getOne(params.restaurantId, {
    expand: 'user_id'
  });
  const user = restaurant.expand.user_id;
  const menuItems = await pb.collection('menu_items').getList(1, 50, {
    filter: `restaurant_id = "${params.restaurantId}"`,
    sort: '-created',
    expand: 'restaurant_id, restaurant_id.user_id'
  });
  
  const menuItemList = menuItems.items.map((menuItem) => {
    return (
      <MenuItem key={menuItem.id} menuItem={menuItem} user={user}/>
    )
  });

  return (
    <div className='Menu'>
      <RestaurantList
        user={user}
        userRestaurants={[restaurant]}
        recView={true}
      />
      {/* <RestaurantItem user={user} restaurant={restaurant} recView={true}/> */}
      {menuItemList}
    </div>
  )
}