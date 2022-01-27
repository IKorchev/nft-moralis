import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid"
import { MdRadioButtonChecked, MdRadioButtonUnchecked, MdSort } from "react-icons/md"

const sortOptions = [
  { name: "ID Ascending", data: "id-asc" },
  { name: "ID Descending", data: "id-desc" },
]

const SortSection = ({ sortOption, setSortOption }) => {
  return (
    <Disclosure as='div' className='' defaultOpen={false}>
      {({ open }) => (
        <form className={`block`}>
          <h3 className='sr-only'>Sort</h3>
          <>
            <h3 className=' flow-root'>
              <Disclosure.Button
                className={`px-5 py-3  ring-white   
                  w-full flex items-center justify-between text-gray-100
                   hover:text-gray-200  focus:ring-2 ${
                     open ? "bg-pink-900" : "bg-pink-700"
                   } `}>
                <MdSort /> Sort
                <span className='ml-4 flex items-center'>
                  {open ? (
                    <ChevronUpIcon className='h-5 w-5' aria-hidden={!open} />
                  ) : (
                    <ChevronDownIcon className='h-5 w-5' aria-hidden={!open} />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel
              className={` py-2  bg-pink-800 scrollbar-thin  scrollbar-track-primary-900 overflow-auto scrollbar-thumb-pinkish `}>
              <div className=''>
                {sortOptions?.map((option, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault()
                      sortOption === option.data
                        ? setSortOption(null)
                        : setSortOption(option.data)
                    }}
                    className={`${
                      sortOption === option.data ? "bg-rose-400 text-black font-bold" : ""
                    } flex items-center px-4 w-full text-left text-white p-2 hover:bg-rose-900 ring-white focus:ring-2`}>
                    {sortOption === option.data ? (
                      <MdRadioButtonChecked className='h-5 w-5 mr-5' />
                    ) : (
                      <MdRadioButtonUnchecked className='h-5 w-5 mr-5' />
                    )}

                    {option.name}
                  </button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        </form>
      )}
    </Disclosure>
  )
}

export default SortSection
