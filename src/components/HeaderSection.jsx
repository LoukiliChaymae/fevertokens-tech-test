import React from 'react'
import { AiOutlineSetting  } from 'react-icons/ai';

function HeaderSection() {
  return (
    <div className='flex flex-row justify-between px-8 py-2 w-screen items-center' >
      <div>
        <img src="https://uploads-ssl.webflow.com/61d9a9b5355373e087deb806/61d9ae6a2703b485df6af62b_FTlogoclean-p-500.png" alt="bitcoin" className=" h-8 " />
      </div>
      <div>
        <input type="text" placeholder='search for ur token' 
          className="p-2 border border-[#3c3973] rounded-md text-sm  focus:text-red-500   placeholder-gray-300 bg-[#16152A]"
          />
      </div>
      <div>
      <AiOutlineSetting color='white' />
      </div>
    </div>
  )
}

export default HeaderSection