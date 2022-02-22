import { AnimatePresence, motion as m } from "framer-motion"
import { useState } from "react"

function InstallMetamask() {
  const [isShown, setIsShown] = useState(true)
  const handleClose = () => {
    setIsShown(false)
  }
  return (
    <AnimatePresence>
      {isShown ? (
        <m.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className={"fixed w-full bottom-0 left-0  bg-yellow-200"}>
          <div className='relative  px-12 py-2 grid place-items-center '>
            <button className='absolute top-3 right-3' onClick={handleClose}>
              &#10006;
            </button>
            <p className='text-center text-sm'>
              Could not detect Metamask in your browser. This might cause the app to
              <strong> NOT </strong> behave as usual.
            </p>
            <div className='flex space-x-5 mt-2'>
              <a
                className='bg-blue-300 rounded-sm p-1 px-2 text-[0.8rem]'
                href='https://metamask.io/download/'
                target='_blank'
                rel='noreferrer'>
                Download Metamask
              </a>
              <button className='bg-red-500 rounded-sm px-2 text-[0.8rem]' onClick={handleClose}>
                Close <span className='ml-2'> &#10006;</span>
              </button>
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}
export default InstallMetamask
