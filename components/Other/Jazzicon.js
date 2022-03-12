import { useEffect, useRef } from "react"
import jazzicon from "@metamask/jazzicon"
const Jazzicon = ({ address, size, ...props }) => {
  const iconRef = useRef()
  useEffect(() => {
    if (!iconRef) return
    iconRef.current.innerHTML = ""
    iconRef.current.appendChild(jazzicon(size, parseInt(address?.slice(2, 10), 16)))
  }, [address])
  return <div ref={iconRef} {...props} className='flex items-center'></div>
}

export default Jazzicon
