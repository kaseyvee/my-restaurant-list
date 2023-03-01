'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { pb } from "@/helpers/dbconnect";
import { storage } from "@/helpers/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid"; 
import ReactLoading from 'react-loading';

import '../../../../styles/NewForm.scss';

import FormTitle from "@/components/FormTitle";
import AddButton from "@/components/AddButton";
import Image from "next/image";

export default function EditRestaurant({ params }: any) {
  const [restaurant, setRestaurant] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    pb.collection('restaurants').getOne(params.restaurantId)
      .then(fetchedRestaurant => {
        setRestaurant(fetchedRestaurant);
      })
      .catch(err => console.log(err.message))
  }, [])

  const name = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const imageLink = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const loggedInUser: any = pb.authStore.model;

  function redirect() {
    router.push(`/${loggedInUser.username}/${restaurant.id}`);
  }

  async function handleImageUpload() {
    if (!imageUpload) return;
    const imageRef = ref(storage, `restaurants/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    console.log("inside handleimageupload", name.current?.value)
    const imageUrl = getDownloadURL(snapshot.ref);
    return imageUrl;
  }

  async function handleEditRestaurantRequest(image = '') {
    const data: any = {
      "name": name.current && name.current.value,
      "address": (address.current && address.current.value) || '',
      image
    };

    const restaurant = await pb.collection('restaurants').update(params.restaurantId, data);
  }

  async function handleEditRestaurant(e: any) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (name.current && !name.current.value) {
      console.log("the fawk")
      setLoading(false);
      return setError("Please enter the name.");
    }

    if (imageUpload) {
      try {
        const imageUrl: any = await handleImageUpload();
        await handleEditRestaurantRequest(imageUrl);
        return redirect();
      }
      catch(err) {
        setLoading(false);
        return setError("Something went wrong. :( Try again.");
      }
    }

    if (imageLink.current && imageLink.current.value) {
      try {
        console.log(imageLink.current.value)
        await handleEditRestaurantRequest(imageLink.current.value);
        return redirect();
      }
      catch(err) {
        setLoading(false);
        return setError("Something went wrong. :( Try again.");
      }
    }

    try {
      await handleEditRestaurantRequest();
      return redirect();
    }
    catch(err) {
      setLoading(false);
      return setError("Something went wrong. :( Try again.");
    }
  }

  return (
    <div className="NewForm">
      <FormTitle
        text="Edit Restaurant"
        redirect={`/${loggedInUser.username}/${params.restaurantId}`}
      />
      <form onSubmit={(e) => handleEditRestaurant(e)}>
        <input
          ref={name}
          defaultValue={restaurant.name}
          type="text"
          placeholder="Name"
        />
        <input
          ref={address}
          defaultValue={restaurant.address}
          type="text"
          placeholder="Address"
        />
        <input
          ref={imageLink}
          defaultValue={restaurant.image}
          type="text"
          placeholder="Image URL"
        />
        <p>or</p>
        <label htmlFor="upload">
          <input
            type="file"
            id="upload"
            onChange={(e) => {
              setImageUpload(e.target.files && e.target.files[0]);
            }}
          />
          <Image src="/upload.png" alt="upload" width={24} height={24} />{" "}
          {imageUpload ? "Oooh! Pretty!" : "Upload"}
        </label>
        {loading ? (
          <div className="loading-ui">
            <ReactLoading
              type={"spinningBubbles"}
              color={"#ffffff"}
              width={80}
            />
          </div>
        ) : (
          <AddButton text="Update Restaurant" />
        )}
        {error && <h4 className="error">{error}</h4>}
      </form>
    </div>
  );
}
