import Image from "next/image"

export default function AddButton(props: any) {
  return (
    <button
      className="btn clickable"
      onClick={props.onClick}
    >
      <Image src='/add.png' alt='add icon' width={38} height={37} /> {props.text}
    </button>
  )
}