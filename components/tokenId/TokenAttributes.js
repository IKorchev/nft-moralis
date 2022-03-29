import React from "react"

const TokenAttributes = ({ attributes }) => {
  return (
    <div className='grid grid-cols-3 gap-3 p-4'>
      {attributes?.map((el) => (
        <div
          key={el.value}
          className='border-secondary-300  bg-secondary-600 col-span-1 grid place-items-center rounded-lg border-2 p-1 text-center text-white'>
          <small className='font-bold'>{el.trait_type}</small>
          <small>{el.value}</small>
        </div>
      ))}
    </div>
  )
}

export default TokenAttributes
