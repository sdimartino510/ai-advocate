'use client'

import { useState } from "react";
import Header from "../components/header";
import EditComponent from "../components/editComponent";
import ButtonSquare from "../components/buttonSquare";
import CoverComponent from "../components/coverComponent";

export default function EditPage() {

  const [editing,isEditing]=useState(false);

  const edit_sections={
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
        {<ButtonSquare className="self-start ml-5" Text={'Go Back'} onClick={''} To={"/"}/>}
        <div className="lg:px-40 p-5 lg:w-[1200]">
          <h1 className="text-4xl">Bill Title</h1>
          <p className="text-xl font-bold">Bill ID</p>
          <p>Last updated: 1/10/2025</p>
        </div>
          {/* {editing sections} */}
          {<EditComponent section={edit_sections.summary}/>}
          {<EditComponent section={edit_sections.thoughts}/>}
          {<EditComponent section={edit_sections.pros_cons}/>}
          {<ButtonSquare className="self-start ml-5" Text={'Back to Home'} onClick={''} To={"/"}/>}{<CoverComponent editing={editing}/>}
      </div>
    );
  }
