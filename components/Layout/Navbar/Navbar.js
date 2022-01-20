import { useMoralis } from "react-moralis"
import Link from "next/link"
import AccountAndBalance from "./AccountAndBalance"
import Dropdown from "./Dropdown"
import { Menu } from "@headlessui/react"
const Navbar = () => {
  const { logout, account, enableWeb3, deactivateWeb3 } = useMoralis()

  return (
    <>
      {/* MOBILE MENU */}
      <Menu as='div' className='lg:hidden h-16'>
        {({ open }) => (
          <>
            <Menu.Button
              as='div'
              className='bg-pinkish rounded-lg fixed top-3 left-3 z-50 p-5 inline-block cursor-pointer'>
              <div
                className={` transition ease-in-out transform duration-700 ${
                  open && "-rotate-45 translate-y-1"
                } w-8 h-1 bg-white`}
              />
              <div
                className={`transition ease-in-out z-50 transform duration-700 ${
                  open && "rotate-45 -translate-y-1"
                } w-8 h-1 mt-1 bg-white`}
              />
            </Menu.Button>
            <Menu.Items
              as='div'
              className=' z-40 text-white fixed px-24 py-12   w-full bg-purple-800 rounded-b-xl  grid place-items-center'>
              <Menu.Item>
                <Link href='/' passHref>
                  <h1 className='text-3xl my-4   z-10 cursor-pointer'>Home</h1>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href='/marketplace' passHref>
                  <h1 className='text-3xl my-4 cursor-pointer'>Marketplace</h1>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href='/marketplace' passHref>
                  <h1 className='text-3xl my-4 cursor-pointer'>Launchpad</h1>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href={`/user/${account}`} passHref>
                  <h1 className='text-3xl my-4   cursor-pointer'>Account</h1>
                </Link>
              </Menu.Item>
              <div className='mx-auto'>
                <AccountAndBalance account={account} icon={false} />
              </div>
              <Menu.Item>
                <button
                  className='text-red-400 inline border-2 border-red-400 px-4 py-2 text-lg mb-5 mt-5 rounded-full '
                  onClick={logout}>
                  Disconnect
                </button>
              </Menu.Item>
            </Menu.Items>
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
          <Link href='/marketplace' passHref>
            <h1 className='text-xl my-4 mx-5  cursor-pointer'>Marketplace</h1>
          </Link>
        </div>
        <div className='flex flex-grow'>
          <Link href='/launchpad' passHref>
            <h1 className='text-xl my-4 mx-5  cursor-pointer'>Launchpad</h1>
          </Link>
        </div>
        {account ? (
          <Dropdown />
        ) : (
          <button
            onClick={enableWeb3}
            className='bg-yellow-400 px-3 py-1.5 rounded-md text-black'>
            Connect
          </button>
        )}
      </div>
    </>
  )
}

export default Navbar
