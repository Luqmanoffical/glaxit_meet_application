import React from 'react'
import { Input, Logo } from '../index'
function Dashboard() {
  return (
    <div  className='flex items-center justify-center w-full mt-9 ' > 
        <div className='flex items-center justify-center w-full mt-9 '>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <div className="mb-2 flex justify-center items-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
    
    <Input
    label="Room Name: "
    type="text"
    placeholder="Search Here"
    name="DashBoard"
  />
  <div className='flex justify-center align-center mt-5'>
  <button
    className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-6 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none w-full"
  >
    Search
  </button>
  <button
    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-6 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none w-full"
  >
    Reset
  </button>

  </div>
  </div>
  </div>
    </div>
  )
}

export default Dashboard
