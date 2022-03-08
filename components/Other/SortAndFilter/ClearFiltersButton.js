import { BiX } from "react-icons/bi"

const ClearFiltersButton = ({ setFilterOption, setSortOption }) => {
  return (
    <button
      onClick={() => {
        setFilterOption(null)
        setSortOption(null)
      }}
      className='flex w-full  items-center justify-between bg-pink-700 px-5 py-3 text-gray-100 ring-white focus:ring-2  hover:bg-secondary hover:text-gray-200 '>
      <span>
        <BiX className='text-xl' />
      </span>
      <span>Clear All</span>
      <span className='invisible w-5'></span>
    </button>
  )
}

export default ClearFiltersButton
