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
  const { completedLaunchpads, currentLaunchpad, isMetamaskInstalled } = useMoralisData()
  const allLaunchpads = [...completedLaunchpads, ...currentLaunchpad]
  const { account, enableWeb3, deactivateWeb3 } = useMoralis()

  const options = allLaunchpads?.map((el) => ({
    label: el.attributes.collectionName,
    value: el.attributes.contractAddress,
    image: el.attributes.imageUrl,
    contractAddress: el.attributes.contractAddress,
  }))
  return (
    <>
      {/* MOBILE MENU */}
      <Menu as='div' className='h-20  lg:hidden'>
        {({ open }) => (
          <>
            <Menu.Button as='div'>
              <button className='fixed top-3 left-3 z-50 inline-block cursor-pointer rounded-lg bg-secondary p-5'>
                <div
                  className={` transform transition duration-700 ease-in-out ${
                    open && "translate-y-1 -rotate-45"
                  } h-1 w-8 bg-white`}
                />
                <div
                  className={`z-50 transform transition duration-700 ease-in-out ${
                    open && "-translate-y-1 rotate-45"
                  } mt-1 h-1 w-8 bg-white`}
                />
              </button>
            </Menu.Button>
            <Menu.Items
              as='nav'
              className='fixed z-40 flex h-[35rem] w-screen flex-col items-center justify-evenly  rounded-b-xl bg-primary-800 py-24 text-white'>
              <Menu.Item as={Link} href='/'>
                <a className='my-4 cursor-pointer text-3xl'>Home</a>
              </Menu.Item>
              <Menu.Item as={Link} href='/marketplace'>
                <a className='cursor-pointer py-4 text-3xl'>Marketplace</a>
              </Menu.Item>
              <Menu.Item as={Link} href='/launchpad'>
                <a className='my-4 cursor-pointer text-3xl'>Launchpad</a>
              </Menu.Item>

              {/* TODO: Create a page to view all the collections/launchpads
              <Menu.Item as={Link} href='/collections'>
                <a className='text-3xl my-4 cursor-pointer'>Collections</a>
              </Menu.Item> */}
              {account && (
                <Menu.Item as='div' className='flex'>
                  <Link href={`/user/${account}`}>
                    <a className='my-4 ml-12 flex text-3xl' href={`/user/${account}`}>
                      <AccountAndBalance icon={false} />
                    </a>
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
                    className='mb-5 mt-5 inline rounded-full border-2 border-red-400 px-4 py-2 text-lg text-red-400 '
                    onClick={deactivateWeb3}>
                    Disconnect
                  </button>
                ) : (
                  <button
                    className='mb-5 mt-5 inline rounded-full border-2  bg-yellow-500 px-4 py-2 text-lg font-extrabold text-black '
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

      <div className='container mx-auto hidden items-center justify-between py-5  text-white lg:flex'>
        <Link href='/' passHref>
          <a className='z-10 my-4 inline cursor-pointer whitespace-nowrap text-3xl font-extrabold '>
            NFT Explorer
          </a>
        </Link>
        <ul className='flex items-center justify-start'>
          <div className='flex flex-grow'>
            <li>
              <Link href='/marketplace' passHref>
                <a className='my-4 mx-5 cursor-pointer  text-xl'>Marketplace</a>
              </Link>
            </li>
            <li>
              <Link href='/launchpad' passHref>
                <a className='my-4 mx-5 cursor-pointer  text-xl'>Launchpad</a>
              </Link>
            </li>
          </div>
          <li className='ml-4 cursor-text xl:ml-16'>
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Search collections'
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
            className='mb-5 mt-5 inline rounded-full border-2  bg-yellow-500 px-4 py-1 text-lg font-extrabold text-black '
            onClick={enableWeb3}>
            Connect
          </button>
        )}
      </div>
    </>
  )
}

export default Navbar
