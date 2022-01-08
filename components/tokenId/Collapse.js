import { Disclosure, Transition } from "@headlessui/react"
import { useState } from "react"
import ChevronIcon from "@heroicons/react/solid/ChevronDownIcon"
const Collapse = ({ children, buttonText }) => {
  const [collapse, setCollapse] = useState(false)


  return (
    <Disclosure>
      {({ open }) => (
        <div className=' rounded-lg overflow-hidden bg-white mt-2'>
          <Disclosure.Button
            className={`transition-all  duration-300 flex justify-between text-black w-full px-4 text-lg font-bold  py-5 ${
              open ? "bg-purple-500 " : "bg-white"
            }
           text-left  rounded-lg hover:bg-purple-400  focus:outline-none
            focus-visible:ring focus-visible:ring-purple-200 focus-visible:ring-opacity-75`}>
            {buttonText}
            <ChevronIcon
              className={`h-8 w-8 transition-all duration-500 ${
                open ? "rotate-180" : ""
              }`}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter='transition-[max-height] duration-500'
            enterFrom='max-h-0 opacity-0'
            enterTo='max-h-[20rem]'
            leave='transition-[max-height] duration-500'
            leaveFrom='max-h-[20rem] opacity-100'
            leaveTo='opacity-0 max-h-0'>
            <Disclosure.Panel className=' overflow-hidden '>{children}</Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  )
}

export default Collapse
