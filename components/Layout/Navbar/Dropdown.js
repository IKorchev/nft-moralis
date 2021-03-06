import { Menu } from "@headlessui/react"
import { useMoralis } from "react-moralis"
import { useRouter } from "next/router"
import AccountAndBalance from "./AccountAndBalance"
import { motion } from "framer-motion"
import { copyTextToClipboard } from "../../../utils/common"
import { AiOutlineCopy, AiFillAppstore, AiOutlineDisconnect } from "react-icons/ai"
import { toast } from "react-toastify"

export default function Dropdown() {
  const router = useRouter()
  const { account, deactivateWeb3 } = useMoralis()
  const notify = (text, type) => {
    toast[type](text, {
      autoClose: 1000,
      closeButton: true,
    })
  }

  return (
    <Menu as='div' className='relative z-50 inline-block text-left'>
      <Menu.Button
        className='flex items-center p-0 hover:bg-opacity-30 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white
        focus-visible:ring-opacity-75'>
        <AccountAndBalance account={account} />
      </Menu.Button>
      <Menu.Items
        as={motion.div}
        initial={{
          opacity: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        exit={{
          opacity: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        }}
        transition={{ duration: 0.2 }}
        className='border-secondary-100 bg-secondary-800 absolute right-0 z-50 mt-2  w-48 origin-top transform
           rounded-md  border p-2 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => {
                copyTextToClipboard(account)
                notify("Address copied!", "success")
              }}
              className={`${active ? "bg-secondary-500 text-white" : ""} text-md flex w-full items-center px-2 py-2`}>
              <AiOutlineCopy className='mr-2 text-lg ' /> Copy address
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => router.push(`/user/${account}`)}
              className={`${active ? "bg-secondary-500 text-white" : " "} text-md flex w-full items-center  px-2 py-2`}>
              <AiFillAppstore className='mr-2 text-lg' /> NFTs
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={deactivateWeb3}
              className={`${
                active ? "bg-secondary-500 text-white" : " "
              }   text-md mt-1 flex w-full items-center px-2 py-2`}>
              <AiOutlineDisconnect className='mr-2 text-lg' /> Disconnect
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
