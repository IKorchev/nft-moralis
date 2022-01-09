import { useState } from "react"
import { Dialog } from "@headlessui/react"

const PopupModal = ({ isOpen, setIsOpen, children }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      {children}
    </Dialog>
  )
}

export default PopupModal
