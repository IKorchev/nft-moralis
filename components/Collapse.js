import { useState } from "react"

const Collapse = ({ children, ...props }) => {
  const [collapse, setCollapse] = useState(false)
  const toggleCollapse = () => {
    setCollapse(!collapse)
  }

  return (
    <div {...props} className={` transition-all duration-700 ${collapse ? "h-14" : ""}`}>
      <a
        className={` ${
          collapse ? "bg-purple-800" : "bg-purple-600"
        } inline-block px-6 py-2.5 w-full text-2xl h-full text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
        onClick={toggleCollapse}
        role='button'
        aria-expanded='false'
        aria-controls='collapseExample'>
        {props.title || "HAHAHAH"}
      </a>
      <div
        className={`transition-all duration-200 bg-black  ${
          collapse ? "collapse" : "collapsed"
        }`}>
        {children}
      </div>
    </div>
  )
}

export default Collapse
