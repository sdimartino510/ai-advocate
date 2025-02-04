import Form from 'next/form'

export default function Search() {
  return (
    <div className="h-[80px] w-screen flex justify-center">
            <Form action="/search" className='m-[20px] flex items-center'>
                    <p className='text-2xl'>Bill ID Search</p>
                {/* Ideally we debounce, but if not, then on submission, the input value will be appended to the URL, e.g. /search?query=abc */}
                <div id='search-input'>
                    <input name="query" className='mx-[14px] w-96 h-10 rounded-3xl border border-grayBlue'/>
                    <button type="submit">Submit</button>
                </div>

    </Form>


    </div>
  );
}
