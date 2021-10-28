import React, { useRef, useState } from "react"
import { copyTextToClipboard } from "../utils/common"
import DuplicateIcon from "@heroicons/react/solid/DuplicateIcon"

function Index({ text, shown }) {
  const textRef = useRef()
  const [showNotification, setShowNotification] = useState()
  return (
    <>
      {shown && (
        <div
          role='tooltip'
          className='z-20 absolute  top-6 -translate-x-1/2 left-1/2 shadow-lg bg-white p-2 rounded'>
          <div className='flex'>
            <input
              ref={textRef}
              value={text}
              readOnly
              className='text-sm w-96  text-gray-800 b-1'
            />
            <button
              className='text-black'
              onClick={() => {
                copyTextToClipboard(text)
                textRef.current.select()
                setShowNotification(true)
                setTimeout(() => {
                  setShowNotification(false)
                }, 5000)
              }}>
              <DuplicateIcon className='h-5 w-5' />
            </button>
          </div>
          {showNotification && <div className='text-black text-center'>Text copied</div>}
        </div>
      )}
    </>
  )
}
export default Index
