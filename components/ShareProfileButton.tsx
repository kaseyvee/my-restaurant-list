'use client';

import { useState } from "react";

export default function ShareProfileButton({ user }: any) {
  const [clipboardCopy, setClipboardCopy] = useState(false);

  function handleShareProfile() {
    navigator.clipboard.writeText(`http://localhost:3000/${user.username || null}`)
    setClipboardCopy(true);
    setTimeout(() => {
      setClipboardCopy(false);
    }, 3000);
  }

  return (
    <button className='btn' onClick={handleShareProfile}>
      {clipboardCopy ? "Clipboarded!" : "Share Profile"}
    </button>
  )
}