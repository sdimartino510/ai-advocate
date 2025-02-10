import { useState } from 'react';
import ButtonSquare from './buttonSquare';

export default function EditComponent({section}) {

const [difficulty, setDifficulty] = useState('casual')

  return (
    <div className="flex flex-col self-center border border-grayBlue rounded-lg bg-white w-full lg:w-[960px] lg:px-24 p-5 gap-3 ">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-2xl font-semibold">{section.title}</h2>
        {/* Render content based on isProsCons */}
        {section.title != 'Pros and Cons' ? (
          <>
            {/* Render summary-specific content */}
            {section.title == 'Bill Summaries'&& (
              <div className="flex flex-row gap-8 text-lg text-gray-500">
                {/* update to buttons */}
                <button
                  className={`${difficulty== 'casual' ? 'text-black' : ''}`}
                  onClick={()=>setDifficulty('casual')}>
                    Casual
                </button>
                <button
                  className={`${difficulty== 'basic' ? 'text-black' : ''}`}
                  onClick={()=>setDifficulty('basic')}>
                    Basic
                </button>
                <button
                  className={`${difficulty== 'professional' ? 'text-black' : ''}`}
                  onClick={()=>setDifficulty('professional')}>
                    Professional
                </button>
              </div>
            )}
            {/* Textarea and checkbox for components */}
            <textarea rows="10" className="border border-grayBlue rounded-lg w-full" />

            {section.title == 'Bill Summaries'&& (
            <div className="flex self-start gap-2">
              <input type="checkbox" className="border border-grayBlue rounded-lg"/>
              <span> This summary has been verified by the panelists</span>
            </div>)}
          </>
        ) : (
          // Content for pros and cons
          <div className="flex flex-col gap-8 w-full lg:w-[960px] lg:px-24 p-5 ">
            <div className=''>
              <h3 className='font-semibold'>Pros:</h3>
              <input type="text" className="w-2/3 border border-black rounded-lg my-3"/><br/>
              <input type="text" className="w-2/3 border border-black rounded-lg my-3"/><br/>
              <input type="text" className="w-2/3 border border-black rounded-lg my-3"/><br/>
            </div>
            <div>
              <h3 className='font-semibold'>Cons:</h3>
              <input type="text" className="w-2/3 border border-black rounded-lg my-3"/><br/>
              <input type="text" className="w-2/3 border border-black rounded-lg my-3"/><br/>
              <input type="text" className="w-2/3 border border-black rounded-lg my-3"/><br/>
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="flex justify-start p-2 gap-3">
      {<ButtonSquare className="self-start ml-5" Text={'Edit'} onClick={''} To={"/"}/>}
      </div>
    </div>
  );
}