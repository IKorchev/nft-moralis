import Link from "next/link"
import AccountAndBalance from "./AccountAndBalance"
import Dropdown from "./Dropdown"
import Select from "react-select"
import ConnectWalletButton from "../../Buttons/ConnectWalletButton"
import DisconnectButton from "../../Buttons/DisconnectButton"
import useScrollOffset from "../../../hooks/useScrollOffset"
import CollectionsDropdown from "./CollectionsDropdown"
import SwitchNetworkButton from "../../Buttons/SwitchNetworkButton"
import { motion, AnimatePresence } from "framer-motion"
import { Disclosure } from "@headlessui/react"
import { AiFillCopy, AiOutlineShop, AiOutlineHome, AiOutlinePlusSquare } from "react-icons/ai"
import { copyTextToClipboard } from "../../../utils/common"
import { toast } from "react-toastify"
import { customStyles, CustomOption } from "../../../utils/selectCustomStyles"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"
import { launchpadsState } from "../../../store/store"
import { BiCollection } from "react-icons/bi"
import { VscRocket } from "react-icons/vsc"
import { useMoralisData } from "../../Providers/MoralisDataProvider"
import { chainState, currentUserState } from "../../../store/userSlice"

const Navbar = () => {
  const allLaunchpads = useRecoilValue(launchpadsState)
  const chain = useRecoilValue(chainState)
  const account = useRecoilValue(currentUserState)
  const { scrolled } = useScrollOffset()
  const router = useRouter()
  const isHomePage = router.asPath === "/"
  const options = allLaunchpads?.map((el) => ({
    label: el.attributes.collectionName,
    value: el.attributes.contractAddress,
    image: el.attributes.imageUrl,
    contractAddress: el.attributes.contractAddress,
  }))

  return (
    <div>
      {/* MOBILE MENU */}
      <Disclosure as='nav' className='lg:hidden'>
        {({ open }) => (
          <>
            <Disclosure.Button className='bg-secondary-100 fixed top-3 right-3 z-50 inline-block cursor-pointer rounded-lg p-5 lg:hidden'>
              <span className='sr-only'>Open main menu</span>
              <div
                className={` transform transition duration-700 ease-in-out ${
                  open ? "translate-y-1 -rotate-45" : ""
                } h-1 w-8 bg-white`}
              />
              <div
                className={`z-50 transform transition duration-700 ease-in-out ${
                  open ? "-translate-y-1 rotate-45" : ""
                } mt-1 h-1 w-8 bg-white`}
              />
            </Disclosure.Button>
            <AnimatePresence>
              <Disclosure.Panel
                as={motion.div}
                exit={{ y: "-100%", opacity: 0 }}
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  easings: "easeInOut",
                  duration: 0.3,
                }}
                className='bg-primary-800 fixed z-40 flex w-screen flex-col items-start justify-evenly rounded-b-xl  px-5 py-12 text-2xl text-white md:text-3xl'>
                <Link href='/'>
                  <a className=' text-tertiary-100 cursor-pointer text-4xl'>NFT Explorer</a>
                </Link>
                <hr className='border-secondary-200 -ml-6 mb-5 mt-2 w-screen border-2' />
                <Link href='/'>
                  <a className='hover:text-secondary-400 my-3 flex items-center text-white'>
                    <AiOutlineHome className='mr-3 ' /> Home
                  </a>
                </Link>
                <Link href='/marketplace'>
                  <a className='hover:text-secondary-400 my-3 flex items-center text-white'>
                    <AiOutlineShop className='mr-3' /> Marketplace
                  </a>
                </Link>
                <Link href='/launchpad'>
                  <a className='hover:text-secondary-400 my-3 flex items-center text-white'>
                    <VscRocket className='mr-3' /> Launchpad
                  </a>
                </Link>
                <Link href='/collections'>
                  <a className='hover:text-secondary-400 my-3 flex items-center text-white'>
                    <BiCollection className='mr-3' /> All collections
                  </a>
                </Link>
                <Link href='/collections/add'>
                  <a className='hover:text-secondary-400 my-3 flex items-center text-white'>
                    <AiOutlinePlusSquare className='mr-3' /> Add a collection
                  </a>
                </Link>
                <Select
                  className='react-select-container  my-3 text-base'
                  classNamePrefix='react-select'
                  placeholder='Search collections'
                  components={{ Option: CustomOption }}
                  styles={customStyles}
                  options={options}
                />
                {chain && chain.chainId !== "0x3" ? (
                  <SwitchNetworkButton size='lg' rounded='sm' />
                ) : account ? (
                  <div className='flex flex-col '>
                    <div className='flex items-center text-base '>
                      <Link href={`/user/${account}`}>
                        <a className='my-4 flex '>
                          <AccountAndBalance account={account} icon={false} />
                        </a>
                      </Link>
                      <button
                        onClick={() => {
                          copyTextToClipboard(account)
                          toast.success("Address copied", { autoClose: 2000 })
                        }}>
                        <AiFillCopy className='ml-5 cursor-pointer text-xl' />
                      </button>
                    </div>
                    <DisconnectButton className='mt-2' />
                  </div>
                ) : (
                  <div className='mt-2'>
                    <ConnectWalletButton size='lg' rounded='sm' />
                  </div>
                )}
              </Disclosure.Panel>
            </AnimatePresence>
          </>
        )}
      </Disclosure>
      {/* DESKTOP Nav */}

      <div
        className={`fixed top-0 left-0 z-20 mx-auto hidden w-full text-white ${
          scrolled
            ? "bg-primary-900/50 backdrop-blur-sm backdrop-filter"
            : !scrolled && !isHomePage
            ? "border-secondary-100 bg-primary-900 border-b"
            : ""
        } lg:flex`}>
        <div className='container mx-auto flex items-center space-x-10 py-5 lg:text-sm xl:text-lg'>
          <Link href='/'>
            <a className='z-10 inline cursor-pointer whitespace-nowrap text-2xl font-extrabold '>NFT Explorer</a>
          </Link>
          <div className='flex items-center justify-start space-x-5'>
            <Link href='/marketplace'>
              <a className='hover:text-secondary-100 cursor-pointer transition duration-200 '>Marketplace</a>
            </Link>
            <Link href='/launchpad'>
              <a className='hover:text-secondary-100 cursor-pointer transition duration-200 '>Launchpad</a>
            </Link>
            <CollectionsDropdown />
            <Select
              className='react-select-container'
              classNamePrefix='react-select'
              placeholder='Search collections'
              components={{ Option: CustomOption }}
              styles={customStyles}
              options={options}
            />
          </div>
          <div className='flex flex-grow justify-end'>
            {!account ? (
              <ConnectWalletButton size='base' rounded='sm' />
            ) : chain && chain.chainId !== "0x3" ? (
              <SwitchNetworkButton size='base' rounded='sm' />
            ) : (
              <Dropdown />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
