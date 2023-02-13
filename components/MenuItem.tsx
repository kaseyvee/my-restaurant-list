import Image from "next/image";

export default function MenuItem({ menuItem, userId }: any) {
  console.log("rating: ", menuItem.rating)
  function getStars() {
    if (menuItem.rating === 3) {
      return (
        <Image src='/../public/three-star.png' alt='three-stars' width={43} height={41}/>
      )
    }
    if (menuItem.rating === 2) {
      return (
        <Image src='/../public/two-star.png' alt='two-stars' width={33} height={41}/>
      )
    }
    if (menuItem.rating === 1) {
      return (
        <Image src='/../public/one-star.png' alt='one-stars' width={22} height={22}/>
      )
    }
  }
  return (
    <a href={`/profile/${userId}/${menuItem.id}`} className='MenuItem'>
      <Image src={menuItem.image} alt='menu-item' layout='fill' objectFit='contain'/>
      <div>
        <h1>
          hello
        </h1>
        {getStars()}
      </div>
    </a>
  );
}
