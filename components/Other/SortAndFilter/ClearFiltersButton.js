import { BiX } from "react-icons/bi"

const ClearFiltersButton = ({ setFilterOption, setSortOption }) => {
  return (
    <button
      onClick={() => {
        setFilterOption(null)
        setSortOption(null)
      }}
      className='hover:bg-secondary-100 bg-secondary-700/50 shadow-glass-large  mt-4 flex  w-full items-center justify-between rounded-lg px-5 py-3 text-gray-100 ring-white transition duration-150 hover:text-gray-200 focus:ring-1 '>
      <span>
        <BiX className='text-xl' />
      </span>
      <span>Clear All</span>
      <span className=''></span>
    </button>
  )
}

export default ClearFiltersButton
