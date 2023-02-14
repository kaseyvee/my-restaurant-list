import Image from "next/legacy/image";
import '../styles/RestaurantItem.scss';

export default function RestaurantItem({ restaurant, username }: any) {

  const restaurantImage = {
    background: `linear-gradient(#0000008a, #000000a7
      ), center/cover url('${restaurant.image ? restaurant.image : null}')`
  }

  return (
    <div className='RestaurantItem' style={restaurantImage}>
      <div className='title'>
        {username &&
          <h4>
            <a href={`/${username}`}><strong>
                @{username}&apos;s
            </strong></a> favourites at
          </h4>}
        <h1>{restaurant.name}</h1>
        <h4>{restaurant.address}</h4>
      </div>
      <div className='star-container'>
        <div className='star-item'>
          <p>{restaurant.one_stars}</p>
          <Image src='/../public/one-star.png' alt='one-stars' width={22} height={22}/>
        </div>
        <div className='star-item'>
          <p>{restaurant.two_stars}</p>
          <Image src='/../public/two-star.png' alt='two-stars' width={33} height={41}/>
        </div>
        <div className='star-item'>
          <p>{restaurant.three_stars}</p>
          <Image src='/../public/three-star.png' alt='three-stars' width={43} height={41}/>
        </div>
      </div>
    </div>
  );
}
