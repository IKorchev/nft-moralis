import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { MdRadioButtonChecked, MdRadioButtonUnchecked, MdSort } from "react-icons/md"

const SortSection = ({ sortOption, setSortOption, sortOptions, defaultOpen }) => {
  return (
    <Listbox as='div' className='w-60 text-white ' value={sortOption} onChange={setSortOption}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={`flex w-full  items-center
            justify-between px-5 py-3 text-gray-100 ring-white focus:ring-2 hover:bg-secondary  hover:text-gray-200 
            ${open ? "bg-pink-800" : "bg-pink-700"} `}>
            <span>
              <MdSort />
            </span>
            <span>Sort</span>
            <ChevronDownIcon
              className={`h-5 w-5 transform transition duration-150 ${open && "rotate-180"}`}
              aria-hidden={!open}
            />
          </Listbox.Button>
          <Listbox.Options className='styled-scrollbar max-h-60 overflow-auto '>
            {sortOptions.map((option) => (
              <Listbox.Option key={option.data} value={option.data}>
                {({ selected }) => (
                  <li
                    className={`${
                      selected ? "bg-rose-400 font-bold text-black" : ""
                    } flex  w-full cursor-pointer items-center bg-pink-800 p-2 text-left text-white ring-white transition duration-200 focus:ring-2 hover:bg-pink-700`}>
                    {selected ? (
                      <MdRadioButtonChecked className='mr-5 h-5 w-5' />
                    ) : (
                      <MdRadioButtonUnchecked className='mr-5 h-5 w-5' />
                    )}
                    {option.name}
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

export default SortSection
