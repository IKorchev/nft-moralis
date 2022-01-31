import { BiX } from "react-icons/bi"

const ClearFiltersButton = ({ setFilterOption, setSortOption }) => {
  return (
    <button
      onClick={() => {
        setFilterOption(null)
        setSortOption(null)
      }}
      className='px-5 py-3  ring-white
       w-full flex items-center justify-between text-gray-100
         hover:text-gray-200 hover:bg-secondary  focus:ring-2 
          bg-pink-700 '>
      <span>
        <BiX className='text-xl' />
      </span>
      <span>Clear All</span>
      <span className='invisible w-5'></span>
    </button>
  )
}

export default ClearFiltersButton
