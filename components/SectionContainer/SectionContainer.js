import React from "react"

const SectionContainer = ({ children, ...props }) => {
  return (
    <div className='flex min-h-[45rem] min-w-full justify-center gap-2' {...props}>
      {children}
    </div>
  )
}

export default SectionContainer
