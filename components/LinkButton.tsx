'use client';

import { pb } from "@/helpers/dbconnect";
import { useEffect, useState } from "react";

export default function LinkButton(props: any) {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  
  useEffect(() => {
    if (pb.authStore.isValid) {
      setLoggedInUser(pb.authStore.model);
    }
  }, [])

  return (
    <>
      {loggedInUser?.username === props.user.username ?
        <a
          className="btn clickable"
          href={props.href}
        >
          {props.text}
        </a>
      :
      <></>
      }
    </>
  )
}