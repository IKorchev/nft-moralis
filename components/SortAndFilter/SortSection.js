import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { MdRadioButtonChecked, MdRadioButtonUnchecked, MdSort } from "react-icons/md"

const SortSection = ({ sortOption, setSortOption, sortOptions, defaultOpen }) => {
  return (
    <Listbox
      as='div'
      className='text-white w-60 '
      value={sortOption}
      onChange={setSortOption}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={`px-5 py-3  ring-white
                 w-full flex items-center justify-between text-gray-100
                   hover:text-gray-200 hover:bg-secondary  focus:ring-2 ${
                     open ? "bg-pink-800" : "bg-pink-700"
                   } `}>
            <span>
              <MdSort />
            </span>
            <span>Sort</span>
            <ChevronDownIcon
              className={`h-5 w-5 transition duration-150 transform ${
                open && "rotate-180"
              }`}
              aria-hidden={!open}
            />
          </Listbox.Button>
          <Listbox.Options className='max-h-60 overflow-auto styled-scrollbar '>
            {sortOptions.map((option) => (
              <Listbox.Option key={option.data} value={option.data}>
                {({ selected }) => (
                  <li
                    className={`${
                      selected ? "bg-rose-400 text-black font-bold" : ""
                    } bg-pink-800  flex items-center cursor-pointer w-full text-left text-white p-2 transition duration-200 hover:bg-pink-700 ring-white focus:ring-2`}>
                    {selected ? (
                      <MdRadioButtonChecked className='h-5 w-5 mr-5' />
                    ) : (
                      <MdRadioButtonUnchecked className='h-5 w-5 mr-5' />
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
