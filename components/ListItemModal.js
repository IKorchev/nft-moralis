import { Dialog } from "@headlessui/react"
import { motion } from "framer-motion"
import { useState } from "react"

const ListItemModal = ({ isOpen, setIsOpen, image }) => {
  const [price, setPrice] = useState(0)

  return (
    <Dialog
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      open={isOpen}
      onClose={() => setIsOpen(false)}>
      <Dialog.Overlay />
      <Dialog.Title>List your nft</Dialog.Title>
      <div></div>
    </Dialog>
  )
}

export default ListItemModal
