import { Menu } from "@headlessui/react"
import { motion } from "framer-motion"
import { BiCollection } from "react-icons/bi"
import { AiFillPlusSquare } from "react-icons/ai"
import Link from "next/link"
import { ChevronDownIcon } from "@heroicons/react/solid"

export default function Dropdown() {
  return (
    <Menu as='div' className='relative z-50 inline-block text-left'>
      <Menu.Button
        className='flex h-full items-center justify-between  hover:text-secondary-100  
      '>
        Collections <ChevronDownIcon className='ml-3 h-5 w-5' />
      </Menu.Button>
      <Menu.Items
        as={motion.ul}
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
        className='absolute right-0 z-50 w-max origin-top transform divide-y divide-secondary-700
           rounded-md  border border-primary-500 bg-secondary-300 p-2 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <Menu.Item as='li'>
          {({ active }) => (
            <Link href='/collections'>
              <a className={`${active ? " bg-secondary-500 text-white" : " "}  flex w-full items-center px-2 py-2`}>
                <BiCollection className='mr-3 ' /> All collections
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item as='li'>
          {({ active }) => (
            <Link href='/collections/add'>
              <a className={`${active ? "bg-secondary-500 text-white" : " "}  flex w-full items-center  px-2 py-2`}>
                <AiFillPlusSquare className='mr-3' />
                Add collection
              </a>
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
