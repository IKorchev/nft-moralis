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
        className={`rounded-lg bg-emerald-400/10 p-3 text-center text-${text} font-semibold text-secondary shadow-glass lg:text-${lgText}`}>
        <span className='bg-gradient-to-r from-emerald-400 via-white to-secondary bg-clip-text text-transparent'>
          {title}
        </span>
      </h1>
    </div>
  )
}

export default SectionTitle
