import { useMoralis } from "react-moralis"
import Link from "next/link"
import Dropdown from "./Dropdown"
import { Menu } from "@headlessui/react"
import AccountAndBalance from "./AccountAndBalance"
import { AiFillCopy } from "react-icons/ai"
import { copyTextToClipboard } from "../../../utils/common"
import { toast } from "react-toastify"
import { useMoralisData } from "../../Providers/MoralisDataProvider"
import { customStyles, CustomOption } from "../../../utils/selectCustomStyles"
import Select from "react-select"
const Navbar = () => {
  const { completedLaunchpads } = useMoralisData()
  const { logout, account, enableWeb3, deactivateWeb3 } = useMoralis()
  const options = completedLaunchpads?.map((el) => ({
    label: el.attributes.collectionName,
    value: el.attributes.contractAddress,
    image: el.attributes.imageUrl,
    contractAddress: el.attributes.contractAddress,
  }))
  console.log(options)
  return (
    <>
      {/* MOBILE MENU */}
      <Menu as='div' className='lg:hidden  h-20'>
        {({ open }) => (
          <>
            <Menu.Button as='div'>
              <button className='bg-secondary rounded-lg fixed top-3 left-3 z-50 p-5 inline-block cursor-pointer'>
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
              </button>
            </Menu.Button>
            <Menu.Items
              as='nav'
              className='z-40 text-white fixed h-[35rem] w-screen bg-primary-800 py-24 rounded-b-xl  flex flex-col justify-evenly items-center'>
              <Menu.Item as={Link} href='/'>
                <a className='text-3xl my-4 cursor-pointer'>Home</a>
              </Menu.Item>
              <Menu.Item as={Link} href='/marketplace'>
                <a className='text-3xl py-4 cursor-pointer'>Marketplace</a>
              </Menu.Item>
              <Menu.Item as={Link} href='/launchpad'>
                <a className='text-3xl my-4 cursor-pointer'>Launchpad</a>
              </Menu.Item>
              <Menu.Item as={Link} href='/collections'>
                <Select styles={customStyles} />
              </Menu.Item>
              {account && (
                <Menu.Item as='div' className='text-3xl my-4 flex ml-12'>
                  <Link href={`/user/${account}`}>
                    <AccountAndBalance icon={false} />
                  </Link>
                  <AiFillCopy
                    className='h-full w-12 cursor-pointer'
                    onClick={() => {
                      copyTextToClipboard(account)
                      toast.success("Address copied", { autoClose: 1000 })
                    }}
                  />
                </Menu.Item>
              )}
              <Menu.Item>
                {account ? (
                  <button
                    className='text-red-400 inline border-2 border-red-400 px-4 py-2 text-lg mb-5 mt-5 rounded-full '
                    onClick={deactivateWeb3}>
                    Disconnect
                  </button>
                ) : (
                  <button
                    className='bg-yellow-500 text-black font-extrabold inline border-2  px-4 py-2 text-lg mb-5 mt-5 rounded-full '
                    onClick={enableWeb3}>
                    Connect
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </>
        )}
      </Menu>

      {/* DESKTOP Nav */}

      <div className='hidden lg:flex justify-evenly items-center container py-5 px-24 mx-auto text-white'>
        <Link href='/' passHref>
          <a className='text-3xl my-4 inline z-10 font-extrabold cursor-pointer'>
            NE Explorer
          </a>
        </Link>
        <ul className='flex justify-evenly items-center'>
          <li>
            <Link href='/marketplace' passHref>
              <a className='text-xl my-4 mx-5  cursor-pointer'>Marketplace</a>
            </Link>
          </li>
          <li>
            <Link href='/launchpad' passHref>
              <a className='text-xl my-4 mx-5  cursor-pointer'>Launchpad</a>
            </Link>
          </li>
          <li className='cursor-text'>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              components={{ Option: CustomOption }}
              styles={customStyles}
              options={options}
            />
          </li>
        </ul>

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
