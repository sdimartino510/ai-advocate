'use client'

import { useState } from "react";
import Header from "../components/header";
import EditComponent from "../components/editComponent";
import ButtonSquare from "../components/buttonSquare";
import CoverComponent from "../components/coverComponent";
import { SB376 } from "@/SB376";
import { SB376Summary } from "@/SB376_summary";

export default function EditPage() {


  const billData = SB376;
  const billSummary = SB376Summary;
  const [editing,isEditing]=useState(false);

  const edit_sections={
      summary:{
        title: "Bill Summaries",
        text:{
          casual: billSummary.simple_summary,
          basic: billSummary.medium_summary,
          professional: billSummary.complex_summary
        }
      },
      thoughts:{
        title:'Expert\'s Thoughts',
        text:{
          thoughts:'There are currently no expert thoughts'
        }
      },
      pros_cons:{
          title:'Pros and Cons',
        pros:[],
        cons:[]
      }
  }

    return (
      <div className="flex flex-col gap-9">
        {<Header/>}
        {/* Montserrat is not loading or is being overwritten */}
        {<ButtonSquare className="self-start ml-5" Text={'Go Back'} onClick={''} To={"/"}/>}
        <div className="lg:px-40 p-5 lg:w-[1200]">
          <h1 className="text-4xl">{billData.bill.title}</h1>
          <p className="text-xl font-bold">{billData.bill.bill_id}</p>
          <p>Last updated: {billData.bill.history[billData.bill.history.length-1].date}</p>
        </div>
          {/* {editing sections} */}
          {<EditComponent section={edit_sections.summary} />}
          {<EditComponent section={edit_sections.thoughts} />}
          {<EditComponent section={edit_sections.pros_cons} />}
          {<ButtonSquare className="self-start ml-5" Text={'Back to Home'} onClick={''} To={"/"}/>}{<CoverComponent editing={editing}/>}
      </div>
    );
  }
