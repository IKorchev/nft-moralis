import { RadioGroup } from "@headlessui/react"
import { MdSort } from "react-icons/md"
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri"
import { sortOptions } from "../../../store/listingsSlice"
import { useRecoilState } from "recoil"
import { sortState } from "../../../store/listingsSlice"
const SortSection = () => {
  const [sort, setSort] = useRecoilState(sortState)
  return (
    <RadioGroup
      className='w-60 overflow-hidden  rounded-lg bg-secondary-700/50 text-white shadow-glass-large'
      value={sort}
      onChange={setSort}>
      <RadioGroup.Label className='flex w-full items-center justify-between border-b border-secondary-600 px-5 py-3 text-gray-100'>
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
                  flex  w-full cursor-pointer items-center p-2 text-left text-white ring-white transition duration-150 hover:bg-secondary-700 focus:ring-2`}>
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
        onClick={() => setSort(null)}
        className='w-full cursor-pointer border-t border-secondary-600 p-2 text-center  text-white ring-white transition duration-200 focus:ring-1 hover:bg-secondary-700'>
        Clear
      </button>
    </RadioGroup>
  )
}

export default SortSection
