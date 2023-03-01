'use client';

import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { pb } from "@/helpers/dbconnect";
import { storage } from "@/helpers/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid"; 

import '../../../../styles/NewForm.scss';

import FormTitle from "@/components/FormTitle"
import AddButton from "@/components/AddButton"
import Image from "next/image"
import ReactLoading from "react-loading";

export default function Create({ params }: any) {
  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [rating, setRating] = useState<any>('');
  const [error, setError] = useState('');

  const name = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLTextAreaElement>(null);
  const imageLink = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const loggedInUser: any = pb.authStore.model;

  function handleSelectRating(e: any) {
    setRating(e.target.value);
  }

  async function handleImageUpload() {
    if (!imageUpload) return;
    const imageRef = ref(storage, `restaurants/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const imageUrl = getDownloadURL(snapshot.ref);
    return imageUrl;
  }

  async function handleCreateItemRequest(image = '') {
    const data = {
      "name": name.current && name.current.value,
      rating,
      "notes": (notes.current && notes.current.value) || '',
      image,
      "restaurant_id": params.restaurantId,
    };

    await pb.collection('menu_items').create(data);
    const restaurant = await pb.collection('restaurants').getOne(params.restaurantId);

    let ratingToChange: any = {};

    if (rating == 1) {
      ratingToChange["one_stars"] = Number(restaurant.one_stars) + 1
    }
    if (rating == 2) {
      ratingToChange["two_stars"] = Number(restaurant.two_stars) + 1
    }
    if (rating == 3) {
      ratingToChange["three_stars"] = Number(restaurant.three_stars) + 1
    }

    await pb.collection('restaurants').update(restaurant.id, ratingToChange);
  }

  async function handleCreateItem(e: any) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if ((name.current && !name.current.value) || !rating) {
      setLoading(false);
      return setError("Please enter the name and rating.");
    }

    if (imageUpload) {
      try {
        const imageUrl: any = await handleImageUpload();
        await handleCreateItemRequest(imageUrl);
  
        return router.push(`/${loggedInUser.username}/${params.restaurantId}`);
      }
      catch(err) {
        setLoading(false);
        return setError("Something went wrong. :( Try again.");
      }
    }

    if (imageLink.current && imageLink.current.value) {
      try {
        await handleCreateItemRequest(imageLink.current.value);
  
        return router.push(`/${loggedInUser.username}/${params.restaurantId}`);
      }
      catch(err) {
        setLoading(false);
        return setError("Something went wrong. :( Try again.");
      }
    }

    try {
      await handleCreateItemRequest();

      return router.push(`/${loggedInUser.username}/${params.restaurantId}`);
    }
    catch(err) {
      setLoading(false);
      return setError("Something went wrong. :( Try again.");
    }
  }

  return (
    <div className="NewForm">
      <FormTitle text='New Item' redirect='/new'/>
      <form onSubmit={e => handleCreateItem(e)}>
        <input ref={name} type='text' id='name' placeholder='Name'/>
        <select id="stars" defaultValue='' onChange={handleSelectRating}>
          <option value='' disabled>Rating</option>
          <option value={1}>1 star</option>
          <option value={2}>2 stars</option>
          <option value={3}>3 stars</option>
        </select>
        <textarea ref={notes} id='notes' placeholder='Notes'/>
        <input ref={imageLink} type='text' id='image-url' placeholder='Image URL'/>
        <p>or</p>
        <label htmlFor="upload">
          <input type='file' id='upload' onChange={e => {setImageUpload(e.target.files && e.target.files[0])}}/>
          <Image src='/upload.png' alt="upload" width={24} height={24}/> {imageUpload ? "Oooh! Pretty!" : "Upload"}
        </label>
        {loading ?
          <div className="loading-ui">
            <ReactLoading type={"spinningBubbles"} color={"#ffffff"} width={80} />
          </div>
        :
          <AddButton text="Add New Item"/>
        }
        {error && <h4 className="error">{error}</h4>}
      </form>
    </div>
  )
}