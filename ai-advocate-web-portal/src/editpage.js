import Header
 from "./app/components/header";
export default function EditPage() {
    return (
      <div className="flex flex-col">
        {<Header/>}
        {/* Montserrat is not loading or is being overwritten */}
        <button className="">Go Back</button>
          <div className="">
              <h1 className="text-4xl">Bill Title</h1>
              <p className="text-xl font-bold">Bill ID</p>
              <p>Last updated: 1/10/2025</p>
          </div>
          {/* {editing sections} */}
          <button className="">Back to Home</button>
      </div>
    );
  }
