import { RadioGroup } from "@headlessui/react"
import { MdSort } from "react-icons/md"
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri"

const SortSection = ({ sortOption, setSortOption, sortOptions }) => {
  return (
    <RadioGroup
      className='shadow-glass-large bg-secondary-700/50  w-60 overflow-hidden rounded-lg text-white'
      value={sortOption}
      onChange={setSortOption}>
      <RadioGroup.Label className='border-secondary-600 flex w-full items-center justify-between border-b px-5 py-3 text-gray-100'>
        <span>
          <MdSort />
        </span>
        <span>Sort</span>
        <span></span>
      </RadioGroup.Label>
      <ul className='styled-scrollbar max-h-48 overflow-auto py-5 '>
        {sortOptions.map((option) => (
          <RadioGroup.Option key={option.data} value={option.data}>
            {({ checked, active }) => (
              <li>
                <button
                  //prettier-ignore
                  className={`${active ? "bg-secondary-100 font-bold text-black" : ""} 
                  flex  w-full cursor-pointer items-center p-2 text-left text-white ring-white transition duration-150 hover:bg-pink-700 focus:ring-2`}>
                  {checked ? (
                    <RiCheckboxCircleFill className='mr-5 h-5 w-5' />
                  ) : (
                    <RiCheckboxBlankCircleLine className='mr-5 h-5 w-5' />
                  )}
                  {option.name}
                </button>
              </li>
            )}
          </RadioGroup.Option>
        ))}
      </ul>
      <button
        onClick={() => setSortOption(null)}
        className='border-secondary-600 w-full cursor-pointer border-t p-2 text-center  text-white ring-white transition duration-200 hover:bg-pink-700 focus:ring-1'>
        Clear
      </button>
    </RadioGroup>
  )
}

export default SortSection
