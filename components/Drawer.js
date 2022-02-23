import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/solid"
import { motion } from "framer-motion"

const Drawer = ({ open, setOpen, ChildElements }) => {
  return (
    <Transition.Root show={open} as={motion.div}>
      <Dialog as='div' className='fixed inset-0 overflow-hidden' onClose={setOpen}>
        <div className='absolute inset-0 overflow-hidden'>
          <Dialog.Overlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className='absolute inset-0 bg-black/70 '
          />
          <div className='fixed inset-y-0 right-0 flex max-w-full pl-10'>
            <div className='relative w-screen max-w-xs'>
              <motion.div
                initial={{ x: "100%" }}
                exit={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className='flex h-screen flex-col overflow-y-scroll bg-primary-900 py-6 shadow-xl '>
                <div className='flex justify-between px-4 sm:px-6'>
                  <Dialog.Title className='text-2xl font-medium text-gray-100'>
                    Sort and Filter
                  </Dialog.Title>
                  <button
                    type='button'
                    className='rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-white hover:text-white'
                    onClick={() => setOpen(false)}>
                    <span className='sr-only'>Close panel</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='relative mx-auto mt-12 flex-1 px-4 sm:px-6'>{ChildElements}</div>
              </motion.div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Drawer
