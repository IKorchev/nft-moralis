import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

const InstallMetamask = () => {
  const [isShown, setIsShown] = useState(true)
  const handleClose = () => {
    setIsShown(false)
  }
  return (
    <AnimatePresence>
      {isShown ? (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className={"fixed bottom-0 left-0 w-full  bg-yellow-200"}>
          <div className='relative  grid place-items-center px-12 py-2 '>
            <button className='absolute top-3 right-3' onClick={handleClose}>
              &#10006;
            </button>
            <p className='text-center text-sm'>
              Could not detect Metamask in your browser. This might cause the app to
              <strong> NOT </strong> behave as usual.
            </p>
            <div className='mt-2 flex space-x-5'>
              <a
                className='rounded-sm bg-blue-300 p-1 px-2 text-[0.8rem]'
                href='https://metamask.io/download/'
                target='_blank'
                rel='noreferrer'>
                Download Metamask
              </a>
              <button className='rounded-sm bg-red-500 px-2 text-[0.8rem]' onClick={handleClose}>
                Close <span className='ml-2'> &#10006;</span>
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
export default InstallMetamask
