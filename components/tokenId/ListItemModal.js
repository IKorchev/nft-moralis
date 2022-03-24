import { Dialog } from "@headlessui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { toast } from "react-toastify"
import { formatIpfs } from "../../utils/common"
import useMarketInteractions from "../../hooks/useMarketInteraction"
import VideoOrImage from "../Cards/NFTCard/VideoOrImage"

const ListItemModal = ({ onClose, isOpen, data }) => {
  const [price, setPrice] = useState(0)
  const { listItem } = useMarketInteractions()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (price === 0) return
    const id = toast.loading("Awaiting signature ..", {
      position: toast.POSITION.TOP_LEFT,
      closeOnClick: true,
      closeButton: true,
    })
    const status = await listItem(data, price)
    console.log(status)
    const toastType = status === "success" ? "success" : "error"
    const toastMessage = status === "success" ? "Item listed successfully!" : "Error: Something went wrong"
    toast.update(id, {
      isLoading: false,
      type: toastType,
      render: toastMessage,
      autoClose: 4000,
    })
    if (status === "success") {
      setTimeout(() => {
        onClose()
      }, 2000)
    }
  }
  console.log(data)
  return (
    <Dialog
      as={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      open={isOpen}
      onClose={onClose}
      className='fixed inset-0 z-10 grid place-items-center overflow-y-auto'>
      <Dialog.Overlay className='fixed inset-0 bg-black/50' />
      <Dialog.Description className='max-w-96'>
        <motion.div className='border-secondary-600 bg-primary-900 shadow-glass-large z-20 grid place-items-center rounded-lg border p-5  px-24 backdrop-blur-sm backdrop-filter'>
          <Dialog.Title className='py-2 text-white'>List for sale</Dialog.Title>
          <div className='h-60 w-60 bg-gray-100'>
            <VideoOrImage
              setLoading={() => true}
              format={data?.metadata?.format || data?.imageType}
              url={
                //Depending on which page the modal was opened the data will be different format
                //TODO: Use the same data in the future
                formatIpfs(data?.image || data?.imageUrl || data?.url) ||
                formatIpfs(data?.metadata?.image || data?.metadata?.imageUrl || data?.metadata?.url)
              }
            />
          </div>
          <form onSubmit={onSubmit} className='mt-5 flex flex-col text-white'>
            <div className='border-secondary-100 flex w-full items-center justify-evenly rounded-md border px-2'>
              <label htmlFor='listPriceInput' className='col-span-1 px-3'>
                Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type='number'
                step={0.0001}
                min={0}
                id='listPriceInput'
                className='cols-span-1 ring-secondary mr-2 block  bg-black p-2 text-lg text-white focus:ring'
                placeholder='amount'
                value={price}
              />
              <span className='col-span-1'> ETH </span>
            </div>
            <button
              type='submit'
              className=' from-secondary-500 to-secondary-700 mt-5 flex items-center justify-center rounded-lg bg-gradient-to-r py-2 text-xl font-black text-white hover:opacity-90'>
              <span className=''> List for sale</span>
            </button>
          </form>
        </motion.div>
      </Dialog.Description>
    </Dialog>
  )
}

export default ListItemModal
