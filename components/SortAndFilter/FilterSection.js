import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md"
import { AiFillFilter } from "react-icons/ai"

const FilterSection = ({ filterOptions, setFilterOption, filterOption }) => {
  return (
    <Listbox as='div' className='w-60 text-white ' value={filterOption} onChange={setFilterOption}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={`ring-whitefocus:ring-2 flex  w-full items-center justify-between px-5 py-3 text-gray-100 hover:bg-secondary  hover:text-gray-200             
            ${open ? "bg-pink-900" : "bg-pink-700"} `}>
            <span>
              <AiFillFilter />
            </span>
            <span>Filter</span>
            <ChevronDownIcon
              className={`h-5 w-5 transform transition duration-150 ${open && "rotate-180"}`}
              aria-hidden={!open}
            />
          </Listbox.Button>
          <Listbox.Options className='styled-scrollbar max-h-60 overflow-auto '>
            {filterOptions?.map((option) => (
              <Listbox.Option key={option.data} value={option.data}>
                {({ selected }) => (
                  <li
                    className={`${
                      selected ? "bg-rose-400 font-bold text-black" : ""
                    } flex w-full cursor-pointer items-center  bg-pink-800 p-2 text-left text-white ring-white transition duration-200 focus:ring-2 hover:bg-pink-700`}>
                    {selected ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                    <span className='ml-2 truncate'>{option.name}</span>
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
