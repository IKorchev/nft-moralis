import React, { useRef, useState } from "react"
import { copyTextToClipboard } from "../utils/common"
import DuplicateIcon from "@heroicons/react/solid/DuplicateIcon"

function Index({ text, shown, position, className }) {
  const textRef = useRef()
  const [showNotification, setShowNotification] = useState()
  return (
    <>
      {shown && (
        <div
          role='tooltip'
          className={`${className} z-20 absolute transform ${
            position === "top" ? "-translate-y-full" : "translate-y-full"
          } shadow-lg bg-white p-2 rounded w-max`}>
          <div className='flex'>
            <input
              ref={textRef}
              value={text}
              readOnly
              className='text-sm block w-full text-gray-800 b-1'
            />
            <button
              className='text-black'
              onClick={() => {
                copyTextToClipboard(text)
                textRef.current.select()
                setShowNotification(true)
                setTimeout(() => {
                  setShowNotification(false)
                }, 2000)
              }}>
              <DuplicateIcon className='h-5 w-5' />
            </button>
          </div>
          {showNotification && (
            <div className='text-black text-center text-lg'>Text copied</div>
          )}
        </div>
      )}
    </>
  )
}
export default Index
