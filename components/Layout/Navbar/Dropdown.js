import { Menu } from "@headlessui/react"
import { useChain, useMoralis } from "react-moralis"
import { useRouter } from "next/router"
import AccountAndBalance from "./AccountAndBalance"
import { motion } from "framer-motion"
import { copyTextToClipboard } from "../../../utils/common"
import { AiOutlineCopy, AiFillAppstore, AiOutlineDisconnect } from "react-icons/ai"
import { toast } from "react-toastify"

export default function Dropdown() {
  const router = useRouter()
  const { logout, account, disconnect } = useMoralis()
  const notify = (text, type) => {
    toast[type](text, {
      autoClose: 1000,
      className: "mt-12 bg-light",
      closeButton: true,
      progressClassName: "bg-gradient-to-r from-pinkish to-primary-500",
    })
  }
  return (
    <Menu as='div' className='relative inline-block text-left z-50'>
      <Menu.Button className='p-0 flex items-center hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
        <AccountAndBalance />
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
        className='absolute p-2  right-0 w-48 mt-2 transform origin-top bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => {
                copyTextToClipboard(account)
                notify("Address copied!", "success")
              }}
              className={`${
                active ? "bg-primary-500 text-white" : "text-gray-900"
              } flex rounded-md items-center w-full px-2 py-2 text-md`}>
              <AiOutlineCopy className='mr-2 text-lg ' /> Copy address
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => router.push(`/user/${account}`)}
              className={`${
                active ? "bg-primary-500 text-white" : "text-gray-900"
              } flex rounded-md items-center w-full px-2 py-2 text-md`}>
              <AiFillAppstore className='mr-2 text-lg' /> NFTs
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={logout}
              className={`${
                active ? "bg-red-500 text-white" : "text-gray-900 bg-red-300"
              }  flex rounded-md items-center w-full px-2 py-2 text-md mt-1`}>
              <AiOutlineDisconnect className='mr-2 text-lg' /> Disconnect
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
