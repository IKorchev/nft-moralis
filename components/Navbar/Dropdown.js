import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { useChain, useMoralis } from "react-moralis"
import { useRouter } from "next/router"
import AccountAndBalance from "./AccountAndBalance"
import { motion } from "framer-motion"
export default function Dropdown() {
  const { account } = useChain()
  const router = useRouter()
  const { logout } = useMoralis()

  return (
    <Menu as='div' className='relative inline-block text-left z-50'>
      <Menu.Button className='p-0 flex items-center hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
        <AccountAndBalance />
      </Menu.Button>
      <Menu.Items
        as={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
        }}
        transition={{ duration: 0.2 }}
        className='absolute p-2  right-5 w-56 mt-2 transform origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => router.push(`/user/${account}`)}
              className={`${
                active ? "bg-purple-500 text-white" : "text-gray-900"
              } flex rounded-md items-center w-full px-2 py-2 text-lg`}>
              NFTs
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={logout}
              className={`${
                active ? "bg-red-500 text-white" : "text-gray-900 bg-red-300"
              }  flex rounded-md items-center w-full px-2 py-2 text-lg mt-1`}>
              Disconnect
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
