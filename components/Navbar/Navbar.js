import UserIcon from "@heroicons/react/solid/UserIcon"
import { useMoralis } from "react-moralis"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import AccountAndBalance from "./AccountAndBalance"
const Navbar = () => {
  const navRef = useRef()
  const { authenticate, logout, Moralis, isAuthenticated } = useMoralis()
  const [showMenu, setShowMenu] = useState(false)
  const [show, setShow] = useState(false)
  useEffect(() => {
    show && navRef.current.focus()
  }, [show])
  return (
    <>
      {/* MOBILE MENU TOGGLER*/}
      <div className='xl:hidden flex w-full fixed z-40 bg-primary-900 justify-between py-5 px-5 text-white'>
        <Link href='/' passHref>
          <h1 className='text-xl my-auto z-10 cursor-pointer'>NFT Explorer</h1>
        </Link>
        <button
          aria-controls='sidebar'
          className='absolute top-8 right-5 z-50'
          onClick={() => {
            setShow(!show)
            navRef.current.focus()
          }}>
          <div
            className={` transition ease-in-out transform duration-1000 ${
              show && "-rotate-45   translate-y-2"
            } w-5 h-1 bg-white`}
          />
          <div
            className={`transition ease-in-out z-50 transform duration-1000 ${
              show && "rotate-45  -translate-y-1"
            }w-5 h-1 mt-1 bg-white`}
          />
        </button>
      </div>
      <nav className='bg-primary-dark bg-opacity-90 w-full shadow-lg z-0'>
        <div className=' hidden xl:flex justify-between py-4 items-center relative mx-auto px-24 container'>
          <Link href='/' passHref>
            <h1 className='text-xl text-white cursor-pointer font-extrabold'>NE</h1>
          </Link>
          <div className='flex w-1/5 justify-between'>
            <Link href='/explore' passHref>
              <h1 className='text-xl text-white cursor-pointer'>Explore</h1>
            </Link>
            <Link href='/mint' passHref>
              <h1 className='text-xl text-white cursor-pointer'>Mint</h1>
            </Link>
            <Link href='/swap' passHref>
              <h1 className='text-xl text-white cursor-pointer'>Swap</h1>
            </Link>
          </div>
          {!isAuthenticated ? (
            <button
              className='bg-blue-50 p-1 px-3 text-lg font-semibold text-center text-black rounded-lg shadow'
              onClick={() => {
                authenticate({ signingMessage: "hello" })
              }}>
              Connect wallet
            </button>
          ) : (
            <div className='flex items-center'>
              <AccountAndBalance />
              <div className='relative'>
                <button
                  className='text-lg font-semibold p-1 text-center shadow-md rounded-full hover:opacity-90'
                  onClick={async () => {
                    setShowMenu((s) => !s)
                  }}>
                  <UserIcon className='h-6 w-6 text-primary-lightest ' />
                </button>
                <div
                  className={`${
                    showMenu ? "" : "hidden"
                  } divide-y absolute rounded-md top-9 px-12 right-6 bg-primary text-light flex flex-col text-lg p-4 font-semibold z-50`}>
                  <Link href='/account'>
                    <span className='mt-1 hover:opacity-90 py-2 cursor-pointer'>
                      Account
                    </span>
                  </Link>
                  <Link href='/account/nfts' className='mt-1 hover:opacity-90 py-2'>
                    <span className='mt-1 hover:opacity-90 py-2 cursor-pointer'>
                      NFTs
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className='text-red-600 font-semibold mt-2 hover:text-red-900 py-2'>
                    Disconnect
                  </button>
                </div>
              </div>
              <button
                className='text-white text-lg ml-12'
                onClick={() => {
                  Moralis.Plugins.fiat.buy()
                }}>
                Buy with fiat
              </button>
            </div>
          )}
        </div>
      </nav>
      {/* sidebar */}
      <nav className='xl:hidden' tabIndex='1' ref={navRef}>
        <div
          onClick={() => setShow(!show)}
          className={`absolute top-0 left-0 shadow-4xl w-full h-full z-30 bg-black bg-opacity-90 ${
            !show ? "hidden" : ""
          }`}
        />
        <div className='absolute  bg-primary-lightest z-40'>
          <div
            id='sidebar'
            className={`flex fixed tranition duration-300 transform -left-80 shadow-3xl ${
              show ? "translate-x-80" : "translate-x-0"
            }  w-80 h-screen bg-primary-900 top-0 left-0 flex-col  p-6  justify-between container`}>
            <div>
              <Link href='/' passHref>
                <h1 className='text-xl text-white cursor-pointer font-extrabold'>
                  NFT Explorer
                </h1>
              </Link>
              {isAuthenticated && (
                <div className='mt-5'>
                  <AccountAndBalance />
                </div>
              )}
            </div>
            <div className='flex flex-grow flex-col mt-24  justify-between'>
              <div className='flex flex-col h-36 justify-between'>
                <Link href='/explore' passHref>
                  <h1 className='text-3xl text-white cursor-pointer  hover:text-pinkish'>
                    Explore
                  </h1>
                </Link>
                <Link href='/mint' passHref>
                  <h1 className='text-3xl text-white cursor-pointer  hover:text-pinkish'>
                    Mint
                  </h1>
                </Link>
                <Link href='/swap' passHref>
                  <h1 className='text-3xl text-white cursor-pointer  hover:text-pinkish'>
                    Swap
                  </h1>
                </Link>
              </div>
              <div className='text-light flex justify-between text-lg w-full  font-semibold'>
                <Link href='/account'>
                  <span className='mt-1 hover:opacity-90 cursor-pointer'>Account</span>
                </Link>
                <Link href='/account/nfts' className='mt-1 hover:opacity-90 py-2'>
                  <span className='mt-1 hover:opacity-90 cursor-pointer'>NFTs</span>
                </Link>
                <Link href='/account/nfts' className='mt-1 hover:opacity-90 py-2'>
                  <span className='mt-1 hover:opacity-90 cursor-pointer'>Dashboard</span>
                </Link>
              </div>
            </div>
            {isAuthenticated ? (
              <button
                className='text-red-400 w-full border-2 border-red-400 px-4 py-2 text-lg mb-5 mt-5 rounded-full '
                onClick={() => {
                  logout()
                }}>
                Disconnect
              </button>
            ) : (
              <button
                className='bg-blue-50 mb-5 p-1 px-3 text-lg font-semibold text-center text-black rounded-lg shadow'
                onClick={() => {
                  authenticate({ signingMessage: "hello" })
                }}>
                Connect wallet
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
