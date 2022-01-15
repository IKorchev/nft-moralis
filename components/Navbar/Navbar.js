import { useMoralis, useChain } from "react-moralis"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import AccountAndBalance from "./AccountAndBalance"
import Dropdown from "./Dropdown"
import { Menu, Transition } from "@headlessui/react"

const Navbar = () => {
  const navRef = useRef()
  const { logout, Moralis } = useMoralis()
  const { account } = useChain()
  Moralis.enableWeb3()

  return (
    <>
      {/* MOBILE MENU TOGGLER*/}
      <Menu as='div' className='lg:hidden  h-12'>
        {({ open }) => (
          <>
            <Menu.Button
              as='div'
              className='absolute top-3 right-3 z-50 p-5 inline-block cursor-pointer'>
              <div
                className={` transition ease-in-out transform duration-700 ${
                  open && "-rotate-45 translate-y-2"
                } w-8 h-1 bg-white`}
              />
              <div
                className={`transition ease-in-out z-50 transform duration-700 ${
                  open && "rotate-45"
                } w-8 h-1 mt-1 bg-white`}
              />
            </Menu.Button>
            <Transition
              enter='transition duration-75 ease-out'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition duration-500 ease-out'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Menu.Items
                as='div'
                className=' z-40 text-white absolute px-24 py-12  w-full bg-primary-900  grid place-items-center'>
                <Menu.Item>
                  <Link href='/' passHref>
                    <h1 className='text-3xl my-4   z-10 cursor-pointer'>Home</h1>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href='/explore' passHref>
                    <h1 className='text-3xl my-4   cursor-pointer'>Explore</h1>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href='/mint' passHref>
                    <h1 className='text-3xl my-4   cursor-pointer'>Mint</h1>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href='/swap' passHref>
                    <h1 className='text-3xl my-4   cursor-pointer'>Swap</h1>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href={`/user/${account}`} passHref>
                    <h1 className='text-3xl my-4   cursor-pointer'>Account</h1>
                  </Link>
                </Menu.Item>
                <div className='mx-auto'>
                  <AccountAndBalance icon={false} />
                </div>
                <Menu.Item>
                  <button
                    className='text-red-400 inline border-2 border-red-400 px-4 py-2 text-lg mb-5 mt-5 rounded-full '
                    onClick={logout}>
                    Disconnect
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>

      {/* DESKTOP Nav */}

      <div className='hidden lg:flex justify-between container py-5 px-24 mx-auto text-white items-center'>
        <div className=' flex-grow '>
          <Link href='/' passHref>
            <h1 className='text-3xl my-4 inline z-10 font-extrabold cursor-pointer'>
              NE Explorer
            </h1>
          </Link>
        </div>
        <div className='flex flex-grow'>
          <Link href='/explore' passHref>
            <h1 className='text-xl my-4 mx-5  cursor-pointer'>Marketplace</h1>
          </Link>
          <Link href='/mint' passHref>
            <h1 className='text-xl my-4  mx-5 cursor-pointer'>Mint</h1>
          </Link>
          <Link href='/swap' passHref>
            <h1 className='text-xl my-4  mx-5 cursor-pointer'>Swap</h1>
          </Link>
        </div>
        <Dropdown />
      </div>
    </>
  )
}

export default Navbar
