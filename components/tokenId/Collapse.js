import { Disclosure, Transition } from "@headlessui/react"
import ChevronIcon from "@heroicons/react/solid/ChevronDownIcon"
const Collapse = ({ children, buttonText, defaultOpen }) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className=' mt-2 overflow-hidden rounded-lg bg-secondary-700 text-white'>
          <Disclosure.Button
            className={`flex  w-full justify-between rounded-lg px-4 py-5 text-left text-lg font-bold  transition-all  duration-300 
            ${open ? "bg-secondary-500  " : "bg-secondary-300"}
              focus-visible:ring   focus-visible:ring-opacity-75 hover:bg-secondary-500`}>
            {buttonText}
            <ChevronIcon className={`h-8 w-8 transition-all duration-500 ${open ? "rotate-180" : ""}`} />
          </Disclosure.Button>
          <Transition
            show={open}
            enter='transition-all duration-500'
            enterFrom='max-h-0 opacity-0'
            enterTo='max-h-[50rem]'
            leave='transition-all duration-500'
            leaveFrom='max-h-[50rem] opacity-100'
            leaveTo='opacity-0 max-h-0'>
            <Disclosure.Panel className='overflow-hidden'>{children}</Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  )
}

export default Collapse
