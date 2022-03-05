import { useMoralis } from "react-moralis"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Dropdown from "./Dropdown"
import { Disclosure, Menu } from "@headlessui/react"
import AccountAndBalance from "./AccountAndBalance"
import { AiFillCopy } from "react-icons/ai"
import { copyTextToClipboard } from "../../../utils/common"
import { toast } from "react-toastify"
import { useMoralisData } from "../../Providers/MoralisDataProvider"
import { customStyles, CustomOption } from "../../../utils/selectCustomStyles"
import Select from "react-select"
import ConnectWalletButton from "../../Buttons/ConnectWalletButton"
import DisconnectButton from "../../Buttons/DisconnectButton"

const Navbar = () => {
  const { completedLaunchpads, currentLaunchpad } = useMoralisData()
  const allLaunchpads = [...completedLaunchpads, ...currentLaunchpad]
  const { account } = useMoralis()

  const options = allLaunchpads?.map((el) => ({
    label: el.attributes.collectionName,
    value: el.attributes.contractAddress,
    image: el.attributes.imageUrl,
    contractAddress: el.attributes.contractAddress,
  }))
  return (
    <>
      {/* MOBILE MENU */}
      <Disclosure as='nav' className='lg:hidden'>
        {({ open }) => (
          <>
            <Disclosure.Button className='fixed top-3 left-3 z-50 inline-block cursor-pointer rounded-lg bg-secondary p-5 lg:hidden'>
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
                  duration: 0.5,
                }}
                className='fixed z-40 flex w-screen flex-col items-start justify-evenly rounded-b-xl  bg-primary-800 px-5 py-24 text-white'>
                <Link href='/'>
                  <a tabIndex={-1} className='my-4 cursor-pointer text-3xl'>
                    Home
                  </a>
                </Link>
                <Link href='/marketplace'>
                  <a className='cursor-pointer py-4 text-3xl'>Marketplace</a>
                </Link>
                <Link href='/launchpad'>
                  <a className='my-4 cursor-pointer text-3xl'>Launchpad</a>
                </Link>
                {account ? (
                  <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center '>
                      <Link href={`/user/${account}`}>
                        <a className='my-4 flex text-3xl'>
                          <AccountAndBalance icon={false} />
                        </a>
                      </Link>
                      <AiFillCopy
                        className='h-full w-12 cursor-pointer'
                        onClick={() => {
                          copyTextToClipboard(account)
                          toast.success("Address copied", { autoClose: 2000 })
                        }}
                      />
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

      <div className='container mx-auto hidden items-center justify-between py-5  text-white lg:flex'>
        <Link href='/'>
          <a className='z-10 my-4 inline cursor-pointer whitespace-nowrap text-3xl font-extrabold '>
            NFT Explorer
          </a>
        </Link>
        <div className='flex items-center justify-start'>
          <div className='flex flex-grow'>
            <Link href='/marketplace'>
              <a className='my-4 mx-5 cursor-pointer  text-xl'>Marketplace</a>
            </Link>
            <Link href='/launchpad'>
              <a className='my-4 mx-5 cursor-pointer  text-xl'>Launchpad</a>
            </Link>
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
    </>
  )
}

export default Navbar
