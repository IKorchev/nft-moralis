import { RadioGroup } from "@headlessui/react"
import { useEffect } from "react"
import { MdSort } from "react-icons/md"
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri"
import { useRecoilState } from "recoil"
import { sortOptions, sortState } from "../../store/listingsSlice"

const SortSection = () => {
  const [sort, setSort] = useRecoilState(sortState)



  //clean up
  useEffect(() => {
    return () => setSort("")
  }, [])

  return (
    <div className='bg-secondary-700/60 h-max rounded-md'>
      <RadioGroup className=' h-full w-60 rounded-lg text-white' value={sort} onChange={setSort}>
        <RadioGroup.Label className='border-secondary-600 flex w-full items-center justify-between border-b px-5 py-3 text-gray-100'>
          <span>
            <MdSort />
          </span>
          <span>Sort</span>
          <span></span>
        </RadioGroup.Label>
        <ul className='styled-scrollbar overflow-auto py-5 '>
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
          className='border-secondary-600 hover:bg-secondary-700 w-full cursor-pointer border-t p-2  text-center text-white ring-white transition duration-200 focus:ring-1'>
          Clear
        </button>
      </RadioGroup>
    </div>
  )
}

export default SortSection
