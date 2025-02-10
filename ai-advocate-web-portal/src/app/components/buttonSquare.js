
export default function buttonSquare({Text, onClick,}) {

  return (
    <Button className="bg-paleBlue hover:bg-skyBlue text-black font-bold py-2 px-4 border border-black rounded" onClick={()=>onClick}>{Text}</Button>
)}