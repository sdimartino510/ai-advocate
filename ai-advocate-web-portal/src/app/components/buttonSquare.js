import Link from "next/link"
export default function ButtonSquare({Text, onClick, To}) {

  return (
    <Link href={To}><button className="bg-skyBlue hover:bg-blue-300 text-sm text-black px-4 py-1 m-2 border border-black rounded" onClick={()=>onClick}>{Text}</button></Link>
)}