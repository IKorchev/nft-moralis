import { Disclosure, Transition } from "@headlessui/react"
import { useState } from "react"
import ChevronIcon from "@heroicons/react/solid/ChevronDownIcon"
const Collapse = ({ children, buttonText, defaultOpen }) => {
  const [collapse, setCollapse] = useState(false)

  //sdasd
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className=' mt-2 overflow-hidden rounded-lg bg-white'>
          <Disclosure.Button
            className={`flex  w-full justify-between rounded-lg px-4 py-5 text-left text-lg font-bold  text-black transition-all  duration-300 
            ${open ? "bg-primary-500 " : "bg-white"}
            focus:outline-none  focus-visible:ring focus-visible:ring-primary-200 focus-visible:ring-opacity-75 hover:bg-primary-400`}>
            {buttonText}
            <ChevronIcon
              className={`h-8 w-8 transition-all duration-500 ${open ? "rotate-180" : ""}`}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter='transition-all duration-500'
            enterFrom='max-h-0 opacity-0'
            enterTo='max-h-[20rem]'
            leave='transition-all duration-500'
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
