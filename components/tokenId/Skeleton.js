import React from "react"

const Skeleton = () => {
  return (
    <div className='container lg:px-24 py-12 mx-auto  text-white'>
      <div className='items-start gap-1 grid grid-cols-5 mt-5'>
        <div className='col-span-2 '>
          <div className='h-[20rem] lg:h-[35rem] w-full rounded-lg animate-pulse bg-gray-300'></div>

          <div className='mt-5'>
            <div className='h-14 bg-gray-300 w-full rounded-lg'></div>
            <div className='h-14 bg-gray-300 w-full rounded-lg'></div>
          </div>
        </div>
        <div className='bg-primary-900 col-span-3 text-white px-5 rounded-lg'>
          <h2 className='bg-gray-300 text-gray-300 animate-pulse inline'>Example name</h2>
          <p className='my-5 bg-gray-300 text-gray-300 animate-pulse'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nulla harum
          </p>
          <h2 className='my-12 bg-gray-300 text-gray-300 animate-pulse inline'>
            Description
          </h2>
          <p className='mt-4 text-gray-300 bg-gray-300'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, unde.
          </p>
          <div className='mt-5'>
            <h2 className='text-gray-300 bg-gray-300 animate-pulse'>Transactions</h2>
            <table className='w-full border-separate border border-primary-400 mt-3 h-12 bg-primary-500 animate-pulse'></table>
            <div className='bg-primary-500 animate-pulse h-48'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
