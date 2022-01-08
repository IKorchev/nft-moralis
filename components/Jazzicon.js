import { useLayoutEffect, useRef } from "react"
import { createIcon } from "../utils/common"
import jazzicon from "@metamask/jazzicon"
const Jazzicon = ({ address, size, ...props }) => {
  const iconRef = useRef()
  useLayoutEffect(() => {
    if (!iconRef) return
    iconRef.current.innerHTML = ""
    iconRef.current.appendChild(jazzicon(size, parseInt(address?.slice(2, 10), 16)))
  }, [address])
  return <div ref={iconRef} {...props} className='flex items-center'></div>
}

export default Jazzicon
