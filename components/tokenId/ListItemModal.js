import { Dialog } from "@headlessui/react"
import {  motion } from "framer-motion"
import { useState } from "react"
import useMarketInteractions from "../../hooks/useMarketInteraction"
import { formatIpfs } from "../../utils/common"

const ListItemModal = ({ onClose, isOpen, data, chain }) => {
  const [price, setPrice] = useState(0)
  const { listItem } = useMarketInteractions()
  const onSubmit = (e) => {
    e.preventDefault()
    listItem(data, price)
  }
  return (
    <Dialog
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      open={isOpen}
      onClose={onClose}
      className='fixed z-10 inset-0 overflow-y-auto  grid  place-items-center'>
      <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
      <div className='z-20 p-5 bg-white w-[30rem] grid place-items-center rounded-lg'>
        <Dialog.Title>List for sale</Dialog.Title>
        <div className='h-60 w-60 bg-gray-100'>
          <img
            src={formatIpfs(
              data?.metadata?.imageUrl || data?.metadata?.image || data?.metadata?.url
            )}
            alt=''
            className='object-contain'
          />
        </div>
        <form onSubmit={onSubmit} className='flex flex-col  mt-5'>
          <div className='border px-2'>
            <label htmlFor='listPriceInput'>Price: </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type='number'
              id='listPriceInput'
              className='border text-lg p-2'
              placeholder='amount'
              value={price}
            />
            <span> {chain?.nativeCurrency.symbol}</span>
          </div>
          <button
            type='submit'
            className='py-2 mt-5 text-white font-bold text-lg bg-gradient-to-r from-primary-700 rounded-lg to-primary-900 hover:opacity-90'>
            List for sale
          </button>
        </form>
      </div>
    </Dialog>
  )
}

export default ListItemModal
