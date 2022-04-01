import { Disclosure } from "@headlessui/react"

import { motion, AnimatePresence } from "framer-motion"
import ChevronIcon from "@heroicons/react/solid/ChevronDownIcon"

const Collapse = ({ children, buttonText, defaultOpen }) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className=' bg-secondary-800 mt-2 overflow-hidden rounded-lg text-white'>
          <Disclosure.Button
            className={`flex  w-full justify-between rounded-lg px-4 py-5 text-left text-lg font-bold  transition-all  duration-300 
            ${open ? "bg-secondary-500  " : "bg-secondary-300"}
              hover:bg-secondary-500   focus-visible:ring focus-visible:ring-opacity-75`}>
            {buttonText}
            <ChevronIcon className={`h-8 w-8 transition-all duration-500 ${open ? "rotate-180" : ""}`} />
          </Disclosure.Button>
          <AnimatePresence>
            {open && (
              <Disclosure.Panel
                as={motion.div}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: "1px", opacity: 0 }}
                className='overflow-hidden'>
                {children}
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </div>
      )}
    </Disclosure>
  )
}

export default Collapse
