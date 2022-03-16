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
import { AiFillCopy } from "react-icons/ai"
import { copyTextToClipboard } from "../../../utils/common"
import { toast } from "react-toastify"
import { customStyles, CustomOption } from "../../../utils/selectCustomStyles"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"
import { launchpadsState } from "../../../store/store"

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
            <Disclosure.Button className='bg-secondary-100 fixed top-3 left-3 z-40 inline-block cursor-pointer rounded-lg p-5 lg:hidden'>
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
                className='bg-primary-800 fixed z-40 flex w-screen flex-col items-start justify-evenly  rounded-b-xl px-5 py-24 text-white'>
                <Link href='/'>
                  <a className='my-4 mb-10 cursor-pointer text-4xl'>NFT Explorer</a>
                </Link>
                <Link href='/'>
                  <a className='my-4 cursor-pointer text-3xl'>Home</a>
                </Link>
                <Link href='/marketplace'>
                  <a className='cursor-pointer py-4 text-3xl'>Marketplace</a>
                </Link>
                <Link href='/launchpad'>
                  <a className='my-4 mb-6  cursor-pointer text-3xl'>Launchpad</a>
                </Link>
                {account ? (
                  <div className='flex flex-col '>
                    <div className='flex items-center '>
                      <Link href={`/user/${account}`}>
                        <a className='my-4 flex text-3xl'>
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
            ? "border-secondary-100 bg-primary-900 border-b"
            : ""
        } lg:block`}>
        <div className='container mx-auto flex items-center justify-between'>
          <Link href='/'>
            <a className='z-10 my-4 inline cursor-pointer whitespace-nowrap text-3xl font-extrabold '>NFT Explorer</a>
          </Link>
          <div className='flex items-center justify-start'>
            <div className='flex flex-grow'>
              <Link href='/marketplace'>
                <a className='my-4 mx-5 cursor-pointer text-xl  transition duration-200 hover:text-gray-300'>
                  Marketplace
                </a>
              </Link>
              <Link href='/launchpad'>
                <a className='my-4 mx-5 cursor-pointer text-xl  transition duration-200 hover:text-gray-300'>
                  Launchpad
                </a>
              </Link>
              <CollectionsDropdown />
            </div>
            <div className='ml-4 cursor-text xl:ml-16'>
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='Search collections'
                components={{ Option: CustomOption }}
                styles={customStyles}
                options={options}
              />
            </div>
          </div>
          {account ? <Dropdown /> : <ConnectWalletButton />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
