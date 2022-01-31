import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md"
import { AiFillFilter } from "react-icons/ai"
const FilterSection = ({ filterOptions, setFilterOption, filterOption }) => {
  return (
    <Listbox
      as='div'
      className='text-white w-60 '
      value={filterOption}
      onChange={setFilterOption}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={`px-5 py-3  ring-white
               w-full flex items-center justify-between text-gray-100
                 hover:text-gray-200 hover:bg-secondary  focus:ring-2 ${
                   open ? "bg-pink-900" : "bg-pink-700"
                 } `}>
            <span>
              <AiFillFilter />
            </span>
            <span>Filter</span>
            <ChevronDownIcon
              className={`h-5 w-5 transition duration-150 transform ${
                open && "rotate-180"
              }`}
              aria-hidden={!open}
            />
          </Listbox.Button>
          <Listbox.Options className='max-h-60 overflow-auto styled-scrollbar '>
            {filterOptions?.map((option) => (
              <Listbox.Option key={option.data} value={option.data}>
                {({ selected }) => (
                  <li
                    className={`${
                      selected ? "bg-rose-400 text-black font-bold" : ""
                    } bg-pink-800 p-2 flex items-center  cursor-pointer w-full text-left text-white transition duration-200 hover:bg-pink-700 ring-white focus:ring-2`}>
                    {selected ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                    <span className='truncate ml-2'>{option.name}</span>
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  )
}

export default FilterSection
