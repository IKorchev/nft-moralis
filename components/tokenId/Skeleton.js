import React from "react"

const Skeleton = () => {
  return (
    <div className='container mx-auto py-12 text-white  lg:px-24'>
      <div className='mt-5 grid grid-cols-5 items-start gap-1'>
        <div className='col-span-2 '>
          <div className='h-[20rem] w-full animate-pulse rounded-lg bg-gray-300 lg:h-[35rem]'></div>

          <div className='mt-5'>
            <div className='h-14 w-full rounded-lg bg-gray-300'></div>
            <div className='h-14 w-full rounded-lg bg-gray-300'></div>
          </div>
        </div>
        <div className='col-span-3 rounded-lg bg-primary-900 px-5 text-white'>
          <h2 className='inline animate-pulse bg-gray-300 text-gray-300'>Example name</h2>
          <p className='my-5 animate-pulse bg-gray-300 text-gray-300'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nulla harum
          </p>
          <h2 className='my-12 inline animate-pulse bg-gray-300 text-gray-300'>Description</h2>
          <p className='mt-4 bg-gray-300 text-gray-300'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, unde.
          </p>
          <div className='mt-5'>
            <h2 className='animate-pulse bg-gray-300 text-gray-300'>Transactions</h2>
            <table className='mt-3 h-12 w-full border-separate animate-pulse border border-primary-400 bg-primary-500'></table>
            <div className='h-48 animate-pulse bg-primary-500'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
