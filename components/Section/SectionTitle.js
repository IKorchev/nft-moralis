import React from "react"

const SectionTitle = ({ title, size = "lg", justify = "start" }) => {
  const getSize = (sz) => {
    switch (sz) {
      case "sm":
        return ["2xl", "3xl"]
      case "md":
        return ["3xl", "4xl"]
      case "lg":
        return ["4xl", "5xl"]
    }
  }

  const [text, lgText] = getSize(size)
  return (
    <div className={`flex justify-${justify}`}>
      <h1
        className={`bg-secondary-300/10  rounded-lg p-3 text-center backdrop-filter text-${text} text-secondary-100 shadow-glass font-semibold backdrop-blur-sm lg:text-${lgText}`}>
        <span className='to-secondary-100 bg-gradient-to-r from-emerald-400 via-white bg-clip-text text-transparent'>
          {title}
        </span>
      </h1>
    </div>
  )
}

export default SectionTitle
