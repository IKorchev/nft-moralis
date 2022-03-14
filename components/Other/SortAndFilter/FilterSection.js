import { RadioGroup } from "@headlessui/react"
import { BsFillCollectionFill } from "react-icons/bs"
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri"
import { useRecoilValue, useRecoilState } from "recoil"
import { launchpadsState } from "../../../store/store"
import { filterState } from "../../../store/listingsSlice"
const FilterSection = ({ setFilterOption }) => {
  const filterOptions = useRecoilValue(launchpadsState).map((el) => ({
    data: el.attributes.contractAddress,
    name: el.attributes.collectionName,
  }))
  const [filter, setFilter] = useRecoilState(filterState)
  return (
    <RadioGroup
      className='shadow-glass-large bg-secondary-700/50 w-60 overflow-hidden rounded-lg text-white'
      value={filter}
      onChange={setFilter}>
      <RadioGroup.Label className='border-secondary-600 flex w-full items-center justify-between border-b px-5 py-3 text-gray-100'>
        <BsFillCollectionFill className='h-5 w-5' />
        <span className=''>Collections</span>
        <span aria-hidden='true'></span>
      </RadioGroup.Label>
      <ul className='styled-scrollbar max-h-60 overflow-auto '>
        {filterOptions?.map((option) => (
          <RadioGroup.Option key={option.data} value={option.data}>
            {({ checked, active }) => (
              <button
                className={`flex w-full cursor-pointer items-center   p-2 text-left text-white ring-white transition duration-200 hover:bg-pink-700 focus:ring-2 ${
                  active ? "bg-secondary-100 text-black" : ""
                }`}>
                {checked ? (
                  <RiCheckboxCircleFill className='h-5 w-5 flex-shrink-0' />
                ) : (
                  <RiCheckboxBlankCircleLine className='h-5 w-5 flex-shrink-0' />
                )}
                <span className='ml-2 truncate'>{option.name}</span>
              </button>
            )}
          </RadioGroup.Option>
        ))}
      </ul>
      <button
        onClick={() => setFilter(null)}
        className=' border-secondary-600 w-full cursor-pointer border-t p-2 text-center  text-white ring-white transition duration-200 hover:bg-pink-700 focus:ring-1'>
        Clear
      </button>
    </RadioGroup>
  )
}

export default FilterSection
