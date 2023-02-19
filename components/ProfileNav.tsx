'use client';

import { useRouter } from "next/navigation";

export default function ProfileNav({ user, favourites, saved }: any) {

  const router = useRouter();

  const navStyle = {
    opacity: 1,
    borderBottom: "2px solid white",
  }

  function handleViewToggle() {
    if (favourites) router.push(`/${user.username}/saved`);
    if (saved) router.push(`/${user.username}`)
  }

  return (
    <div className='profile-nav'>
      <div
        className='profile-nav-item newest'
        style={favourites && navStyle}
        onClick={handleViewToggle}
      >
        Favourites
      </div>
      <div
        className='profile-nav-item'
        style={saved && navStyle}
        onClick={handleViewToggle}
      >
        Saved
      </div>
    </div>
  )
}