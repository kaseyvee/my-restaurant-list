import { pb } from "@/helpers/dbconnect";
// import getLoggedInUser from "@/helpers/getLoggedInUser";
import getUserRestaurants from "@/helpers/getUserRestaurants";

export default async function New() {
  // console.log("authstore: ", pb.authStore);

  // const authData = await pb.collection('users').authRefresh();
  // const userRestaurants = await getUserRestaurants(authData.record.id);

  // console.log("authData: ", authData)

  return (
    <div className='New'>
      <button className="btn">New Restaurant</button>

    </div>
  );
}
