'use client';

import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { pb } from "@/helpers/dbconnect";
import { storage } from "@/helpers/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid"; 
import ReactLoading from 'react-loading';

import '../../../styles/NewForm.scss';

import FormTitle from "@/components/FormTitle";
import AddButton from "@/components/AddButton";
import Image from "next/image";

export default function NewRestaurant() {
  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [error, setError] = useState('');

  const name = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const imageLink = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const loggedInUser: any = pb.authStore.model;

  async function handleImageUpload() {
    if (!imageUpload) return;
    const imageRef = ref(storage, `restaurants/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const imageUrl = getDownloadURL(snapshot.ref);
    return imageUrl;
  }

  async function handleCreateRestaurantRequest(image = '') {
    const data = {
      "name": name.current && name.current.value,
      "address": (address.current && address.current.value) || '',
      image,
      "user_id": loggedInUser.id,
    };

    const restaurant = await pb.collection('restaurants').create(data);

    return restaurant;
  }

  async function handleCreateRestaurant(e: any) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (name.current && !name.current.value) {
      return setError("Please enter the name.");
    }

    if (imageUpload) {
      try {
        const imageUrl: any = await handleImageUpload();
        const restaurant = await handleCreateRestaurantRequest(imageUrl);
  
        return router.push(`/${loggedInUser.username}/${restaurant.id}/create`);
      }
      catch(err) {
        setLoading(false);
        setError("Something went wrong. :( Try again.");
      }
    }

    if (imageLink.current && imageLink.current.value) {
      const restaurant = await handleCreateRestaurantRequest(imageLink.current.value);

      return router.push(`/${loggedInUser.username}/${restaurant.id}/create`);
    }

    const restaurant = await handleCreateRestaurantRequest();

    return router.push(`/${loggedInUser.username}/${restaurant.id}/create`);
  }

  return (
    <div className='NewForm'>
      <FormTitle text='New Restaurant' redirect='/new'/>
      {loading ? 
        <ReactLoading type={"spinningBubbles"} color={"#ffffff"} width={80} />
      :
        <form onSubmit={e => handleCreateRestaurant(e)}>
          <input ref={name} type='text' id='name' placeholder='Name'/>
          <input ref={address} type='text' id='address' placeholder='Address'/>
          <input ref={imageLink} type='text' id='image-url' placeholder='Image URL'/>
          <p>or</p>
          <label htmlFor="upload">
            <input type='file' id='upload' onChange={e => {setImageUpload(e.target.files && e.target.files[0])}}/>
            <Image src='/upload.png' alt="upload" width={24} height={24}/> {imageUpload ? "Oooh! Pretty!" : "Upload"}
          </label>
          
          <AddButton text="Add New Item"/>
          {error && <h4 className="error">{error}</h4>}
        </form>
      }
    </div>
  );
}
