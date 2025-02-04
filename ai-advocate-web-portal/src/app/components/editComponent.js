import Link from "next/link";
export default function EditComponent() {
  return (
    <div className="flex flex-col border border-grayBlue rounded-lg bg-white w-full lg:w-[960px] p-5 gap-3">
        <div className="col-span-4 row-span-3">
            {/* Montserrat is not loading or is being overwritten */}
            <h2 className="text-2xl">Bill Summaries</h2>
            <div className="flex flex-row">
                <p>Casual</p>
                <p>Basic</p>
                <p>Professional</p>
            </div>
            <input type="text"/><br/>
            <input type="checkbox"/>
        </div>
        {/* Look into page vs layout to confirm this is suitable routing structure */}
        <div className="col-start-4 flex justify-end p-2">
        <button onClick={""}> Edit </button>
        </div>
    </div>
  );
}
