import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, ChevronUpIcon, FilterIcon } from "@heroicons/react/solid"
import { MdRadioButtonChecked, MdRadioButtonUnchecked, MdFilter } from "react-icons/md"

const FilterSection = ({
  variant = "desktop",
  filterOptions,
  setFilterOption,
  filterOption,
}) => {
  return (
    <Disclosure as='div' defaultOpen={false}>
      {({ open }) => {
        return (
          <form className={`${variant === "desktop" ? "hidden" : ""} lg:block`}>
            <h3 className='sr-only'>Filter</h3>
            <>
              <h3 className='flow-root'>
                <Disclosure.Button
                  className={`
                ${open ? "bg-pink-900" : "bg-pink-700"}
                px-5 py-3 ring-white focus:ring-2 w-full flex items-center justify-between text-gray-100  hover:text-gray-200  `}>
                  <MdFilter />
                  <span className='font-medium text-gray-100'>Filter</span>
                  <span className='ml-4 flex items-center'>
                    {open ? (
                      <ChevronUpIcon
                        className='h-5 w-5'
                        aria-hidden={!open ? "true" : "false"}
                      />
                    ) : (
                      <ChevronDownIcon
                        className='h-5 w-5'
                        aria-hidden={open ? "false" : "true"}
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel
                className={`${variant === "desktop" ? "max-h-96" : ""} 
                  py-2  bg-pink-800 scrollbar-thin scrollbar-track-primary-900 overflow-auto
                 scrollbar-thumb-pinkish `}>
                <div className=''>
                  <h1 className='py-2 text-center text-white  border-b border-white'>
                    Collections
                  </h1>
                  {filterOptions?.map(
                    (section, i) =>
                      section && (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.preventDefault()
                            section !== filterOption
                              ? setFilterOption(section)
                              : setFilterOption(null)
                          }}
                          className={` w-full text-left text-white p-2 px-4 flex items-center hover:bg-rose-900 ${
                            section === filterOption
                              ? "bg-rose-400 text-black font-bold"
                              : ""
                          }`}>
                          {section === filterOption ? (
                            <MdRadioButtonChecked className='h-5 w-5 mr-5' />
                          ) : (
                            <MdRadioButtonUnchecked className='h-5 w-5 mr-5' />
                          )}
                          {section}
                        </button>
                      )
                  )}
                </div>
              </Disclosure.Panel>
            </>
          </form>
        )
      }}
    </Disclosure>
  )
}

export default FilterSection
