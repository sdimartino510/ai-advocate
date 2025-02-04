import Link from "next/link";
export default function BillOverview() {
  return (
    <div className="grid grid-cols-4 border border-grayBlue rounded-lg shadow-md shadow-black/25 bg-white w-full lg:w-[960px] p-5 gap-3">
        <div className="col-span-4 row-span-3">
            {/* Montserrat is not loading or is being overwritten */}
            <h2 className="text-4xl">Bill Title</h2>
            <h3 className="text-xl font-bold">Bill ID</h3>
            <p>Last updated: 1/10/2025</p>
            <div className="flex gap-4 pt-4">
                <p>Verified:</p>
                <p>Pros:</p>
                <p>Cons:</p>
            </div>
        </div>
        {/* Look into page vs layout to confirm this is suitable routing structure */}
        <div className="col-start-4 flex justify-end p-2">
            <button className=""><Link href={'/editpage'}>Review Bill</Link></button>
        </div>


    </div>
  );
}
