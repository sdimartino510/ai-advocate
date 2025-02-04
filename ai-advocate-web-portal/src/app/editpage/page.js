import Link from "next/link";
import Header
 from "../components/header";
export default function EditPage() {
    return (
      <div className="flex flex-col">
        {<Header/>}
        {/* Montserrat is not loading or is being overwritten */
        /* if routing changes, confirm links work */
        }
        <button className=""><Link href="/">Go Back</Link></button>
          <div className="">
              <h1 className="text-4xl">Bill Title</h1>
              <p className="text-xl font-bold">Bill ID</p>
              <p>Last updated: 1/10/2025</p>
          </div>
          {/* {editing sections} */}
          <button className=""><Link href="/">Back to Home</Link></button>
      </div>
    );
  }
