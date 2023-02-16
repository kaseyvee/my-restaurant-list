'use client';

import { useEffect, useState } from "react";
import { pb } from "@/helpers/dbconnect";
import { useRouter } from 'next/navigation';

import '../../../styles/NewRestaurant.scss';

import AddButton from "@/components/AddButton";
import FormTitle from "@/components/FormTitle";
import Image from "next/image";

export default function NewRestaurant() {

  async function handleCreateRestaurant() {

  }

  return (
    <div className='NewRestaurant'>
      <FormTitle text='New Restaurant' redirect='/new'/>
      <form onSubmit={handleCreateRestaurant}>
        <input type='text' id='name' placeholder='Name'/>
        <input type='text' id='address' placeholder='Address'/>
        <input type='text' id='image-url' placeholder='Image URL'/>
        <p>or</p>
        <label htmlFor="upload">
          <input type='file' id='upload'/>
          <Image src='/upload.png' alt="upload" width={24} height={24}/> Upload
        </label>
        
        <AddButton text="Add New Item"/>
      </form>
    </div>
  );
}
