import '../../../styles/Menu.scss';
import MenuItem from '@/components/MenuItem';
import PocketBase from 'pocketbase';
import RestaurantItem from '@/components/RestaurantItem';
import Image from 'next/image';

const pb = new PocketBase('http://127.0.0.1:8090');

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
      <div className='users-favourites-at'>
        <h4>
          <a href={`/${user.username}`}><strong>
              @{user.username}&apos;s
          </strong></a> favourites at
        </h4>
        <a href={`/${user.username}`} className='clickable'><Image src='/back.png' alt='back' width={58} height={58}/></a>
      </div>
      <RestaurantItem view={true} user={user} restaurant={restaurant}/>
      {menuItemList}
    </div>
  )
}