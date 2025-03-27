import React from 'react'
import Sidebar from "./sidebar/page"

const Component = () => {
  return (
    <div className="flex">
      <div className="flex-none w-64">
        {/* Sidebar on the right */}
        <Sidebar/>
      </div>


      <div className="flex-1 p-4">
        {/* Main content */}
        <main className="flex-1 p-6">
          
        </main>
        {/* <h1 className='text-center'>hello</h1> */}
      </div>


    </div>
  )
}

export default Component
