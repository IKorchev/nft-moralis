import React from "react"

export const Primary = (props) => {
  return (
    <a
      role='navigation'
      {...props}
      className='border-tertiary-600 from-tertiary-200 to-tertiary-100 focus-within:from-tertiary-100 focus-within:to-tertiary-500 hover:from-tertiary-100 hover:to-tertiary-500 w-max cursor-pointer rounded border 
    bg-gradient-to-tr px-5 py-2.5 text-base text-black ring-white focus-within:ring lg:text-xl'>
      <button tabIndex='0' className='outline-none'>
        {props.title}
      </button>
    </a>
  )
}

export const Secondary = (props) => {
  return (
    <a
      role='navigation'
      {...props}
      className='focus-within:bg-tertiary-100 w-max cursor-pointer rounded border border-cyan-400 bg-transparent px-5 
    py-2.5 text-base ring-white focus-within:text-black focus-within:ring hover:bg-cyan-100 hover:text-black lg:text-xl'>
      <button tabIndex='0' className='outline-none'>
        {props.title}
      </button>
    </a>
  )
}
