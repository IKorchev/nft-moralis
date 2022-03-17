import React from "react"

export const Primary = (props) => {
  return (
    <button>
      <a
        {...props}
        className='w-max cursor-pointer rounded border border-cyan-600 bg-gradient-to-tr from-emerald-200 to-cyan-300 px-5 py-2.5 text-base 
      text-black ring-white focus:from-emerald-100 focus:to-cyan-100 focus:ring hover:from-emerald-100 hover:to-cyan-100 lg:text-xl'>
        {props.title}
      </a>
    </button>
  )
}

export const Secondary = (props) => {
  return (
    <button>
      <a
        {...props}
        className='w-max cursor-pointer rounded border border-cyan-400 bg-transparent px-5 py-2.5 
      text-base ring-white focus:bg-cyan-100 focus:text-black focus:ring hover:bg-cyan-100 hover:text-black lg:text-xl'>
        {props.title}
      </a>
    </button>
  )
}
