import Link from "next/link"
import AccountAndBalance from "./AccountAndBalance"
import Dropdown from "./Dropdown"
import Select from "react-select"
import ConnectWalletButton from "../../Buttons/ConnectWalletButton"
import DisconnectButton from "../../Buttons/DisconnectButton"
import useScrollOffset from "../../../hooks/useScrollOffset"
import CollectionsDropdown from "./CollectionsDropdown"
import { useMoralis } from "react-moralis"
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



const Navbar = () => {
  const allLaunchpads = useRecoilValue(launchpadsState)
  const { account } = useMoralis()
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
            <Disclosure.Button className='fixed top-3 right-3 z-50 inline-block cursor-pointer rounded-lg bg-secondary-100 p-5 lg:hidden'>
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
                className='fixed z-40 flex w-screen flex-col items-start justify-evenly rounded-b-xl bg-primary-800  px-5 py-12 text-2xl text-white md:text-3xl'>
                <Link href='/'>
                  <a className=' cursor-pointer text-4xl'>NFT Explorer</a>
                </Link>
                <hr className='-ml-6 mb-5 mt-2 w-screen border-2 border-secondary-200' />
                <Link href='/'>
                  <a className='my-3 flex  text-white'>
                    <AiOutlineHome className='mr-3 ' /> Home
                  </a>
                </Link>
                <Link href='/marketplace'>
                  <a className='my-3 flex  text-white'>
                    <AiOutlineShop className='mr-3' /> Marketplace
                  </a>
                </Link>
                <Link href='/launchpad'>
                  <a className='my-3 flex  text-white'>
                    <VscRocket className='mr-3' /> Launchpad
                  </a>
                </Link>
                <Link href='/collections'>
                  <a className='my-3 flex '>
                    <BiCollection className='mr-3' /> All collections
                  </a>
                </Link>
                <Link href='/collections'>
                  <a className='my-3 flex '>
                    <AiOutlinePlusSquare className='mr-3' /> Add a collection
                  </a>
                </Link>
                {account ? (
                  <div className='flex flex-col '>
                    <div className='flex items-center '>
                      <Link href={`/user/${account}`}>
                        <a className='my-4 flex '>
                          <AccountAndBalance icon={false} />
                        </a>
                      </Link>
                      <button
                        onClick={() => {
                          copyTextToClipboard(account)
                          toast.success("Address copied", { autoClose: 2000 })
                        }}>
                        <AiFillCopy className='h-full w-12 cursor-pointer' />
                      </button>
                    </div>
                    <DisconnectButton className='my-6' />
                  </div>
                ) : (
                  <ConnectWalletButton />
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
            ? "border-b border-secondary-100 bg-primary-900"
            : ""
        } lg:flex`}>
        <div className='container mx-auto flex items-center space-x-10 py-5 lg:text-sm xl:text-lg'>
          <Link href='/'>
            <a className='z-10 inline cursor-pointer whitespace-nowrap text-2xl font-extrabold '>NFT Explorer</a>
          </Link>
          <div className='flex items-center justify-start space-x-5'>
            <Link href='/marketplace'>
              <a className='cursor-pointer transition duration-200 hover:text-secondary-100 '>Marketplace</a>
            </Link>
            <Link href='/launchpad'>
              <a className='cursor-pointer transition duration-200 hover:text-secondary-100 '>Launchpad</a>
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
          <div className='flex flex-grow justify-end'>{account ? <Dropdown /> : <ConnectWalletButton />}</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
