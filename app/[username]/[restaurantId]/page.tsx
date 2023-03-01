import { pb } from '@/helpers/dbconnect';

import '../../../styles/Menu.scss';

import MenuItem from '@/components/MenuItem';
import RestaurantList from '@/components/RestaurantList';
import LinkButton from '@/components/LinkButton';

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

export default async function Menu({ params }: any) {
  const restaurant = await pb.collection('restaurants').getOne(params.restaurantId, {
    expand: 'user_id'
  });
  const user: any = restaurant.expand.user_id || {};
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
      <LinkButton text="New Item Recommendation" href={`/${user.username}/${params.restaurantId}/create`} user={user}/>
      {menuItemList}
    </div>
  )
}