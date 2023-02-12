
export default function MenuItem({ menuItem, userId }: any) {

  return (
    <a href={`/profile/${userId}/${menuItem.id}`} className='MenuItem'>
      hi
    </a>
  );
}
