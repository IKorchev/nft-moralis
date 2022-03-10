import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/solid"
import { motion } from "framer-motion"
import React from "react"

const Drawer = ({ open, setOpen, ...props }) => {
  console.log(props.children)
  return (
    <Transition.Root show={open} className='lg:hidden' as={motion.div}>
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
                transition={{ duration: 0.3 }}
                className='bg-primary-900/80 shadow-glass-small flex h-screen flex-col overflow-y-scroll py-6 backdrop-blur-sm backdrop-filter '>
                <Dialog.Description className='flex items-center justify-between px-4 sm:px-6'>
                  <Dialog.Title className='text-2xl font-medium text-gray-100'>
                    Sort and Filter
                  </Dialog.Title>
                  <button onClick={() => setOpen(false)} className='text-white'>
                    <XIcon className='h-6 w-6' />
                  </button>
                </Dialog.Description>
                <div className='relative mx-auto mt-12 flex-1 px-4 sm:px-6'>{props.children}</div>
              </motion.div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Drawer
