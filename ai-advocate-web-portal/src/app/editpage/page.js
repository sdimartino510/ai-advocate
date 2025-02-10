import Link from "next/link";
import Header
 from "../components/header";
import EditComponent from "../components/editComponent";
export default function EditPage() {

  let edit_sections={
      summary:{
        title: "Bill Summaries"},
      thoughts:{
        title:'Expert\'s Thoughts'},
      pros_cons:{
          title:'Pros and Cons'}}

    return (
      <div className="flex flex-col gap-9">
        {<Header/>}
        {/* Montserrat is not loading or is being overwritten */
        /* if routing changes, confirm links work */
        }
        <button className="self-start"><Link href="/">Go Back</Link></button>
        <div className="lg:px-44 p-5">
          <h1 className="text-4xl">Bill Title</h1>
          <p className="text-xl font-bold">Bill ID</p>
          <p>Last updated: 1/10/2025</p>
        </div>
          {/* {editing sections} */}
          {<EditComponent section={edit_sections.summary}/>}
          {<EditComponent section={edit_sections.thoughts}/>}
          {<EditComponent section={edit_sections.pros_cons}/>}
        <button className=""><Link href="/">Back to Home</Link></button>
      </div>
    );
  }
