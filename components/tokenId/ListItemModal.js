import { Dialog } from "@headlessui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import useMarketInteractions from "../../hooks/useMarketInteraction"
import { formatIpfs } from "../../utils/common"
import ClipLoader from "react-spinners/ClipLoader"

const ListItemModal = ({ onClose, isOpen, data, chain }) => {
  const [price, setPrice] = useState(0)
  const { listItem } = useMarketInteractions()
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (price === 0) return
    setLoading(true)
    setStatus({
      status: "waiting",
      message: "Awaiting transaction approval",
    })
    const res = await listItem(data, price)
    const message =
      res === "success" ? "Item listed successfully" : res === "error" && "Something went wrong..."
    setStatus({ status: res, message: message })
    setLoading(false)
    if (res === "success") {
      setTimeout(() => {
        onClose()
      }, 2000)
    }
  }

  return (
    <Dialog
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
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
            className='py-2 mt-5 text-white font-bold text-lg flex items-center justify-center bg-gradient-to-r from-primary-700 rounded-lg to-primary-900 hover:opacity-90'>
            <ClipLoader loading={loading} color='white' size={20} />
            <span className=''> List for sale</span>
          </button>
        </form>
        <div
          className={`my-5  py-2 w-3/4 text-center ${
            status.status === "waiting"
              ? "bg-yellow-300"
              : status.status === "error"
              ? "bg-red-400"
              : status.status === "success"
              ? "bg-green-400"
              : " "
          } `}>
          {status.message}
        </div>
      </div>
    </Dialog>
  )
}

export default ListItemModal
