import { useState } from 'react';
import ButtonSquare from './buttonSquare';
import EditableInput from './editableInput';

export default function EditComponent({section}) {

  // needs CRUD implementation
  const [information, setInformation] = useState('casual')

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
                    id='casual'
                    className={`${information== 'casual' ? 'text-black' : ''}`}
                    onClick={()=>setInformation('casual')}>
                      Casual
                  </button>
                  <button
                    id='basic'
                    className={`${information== 'basic' ? 'text-black' : ''}`}
                    onClick={()=>setInformation('basic')}>
                      Basic
                  </button>
                  <button
                    id="professional"
                    className={`${information== 'professional' ? 'text-black' : ''}`}
                    onClick={()=>setInformation('professional')}>
                      Professional
                  </button>
                </div>
              )}
              {/* needs to conditionally render summary or thought. if summary, conditionally render complexity */}
              <textarea rows="10" className=" px-3 py-3 border border-grayBlue rounded-lg w-full">
                  {section.text.casual}
              </textarea>

              {section.title == 'Bill Summaries'&& (
              <div className="flex self-start gap-2">
                <input id={information} type="checkbox" className="border border-grayBlue rounded-lg"/>
                <span> This summary has been verified by the panelists</span>
              </div>)}
            </>
          ) : (
            <div className="flex flex-col gap-8 w-full lg:w-[960px] lg:px-24 p-5 ">
              <div className=''>
                {/* iterate inputs w data */}
                <h3 className='font-semibold'>Pros:</h3>
                <EditableInput/>
                <EditableInput/>
                <EditableInput/>
              </div>
              <div>
                <h3 className='font-semibold'>Cons:</h3>
                <EditableInput/>
                <EditableInput/>
                <EditableInput/>
              </div>
            </div>
          )}
        </div>
        {/* Footer Section */}
        <div className="flex justify-start p-2 gap-3">
          {/* Hide if proscons section true */}
        {<ButtonSquare className="self-start ml-5" Text={'Edit'} onClick={''} To={""}/>}
        </div>
      </div>
  );
}