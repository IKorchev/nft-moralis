import { useEffect, useRef, useState } from "react"

const useScrollOffset = () => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const getScrollOffset = (e) => {
      window.scrollY > 40 ? setScrolled(true) : setScrolled(false)
    }
    window.addEventListener("scroll", getScrollOffset)
    return () => window.removeEventListener("scroll", getScrollOffset)
  }, [])

  return { scrolled }
}

export default useScrollOffset
