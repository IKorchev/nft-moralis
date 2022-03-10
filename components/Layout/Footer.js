import COINBASEIcon from "../../public/assets/coinbase.svg"
import BINANCEIcon from "../../public/assets/binance.svg"
import BITMEXIcon from "../../public/assets/bitmex.svg"
import HUOBIIcon from "../../public/assets/huobi.svg"
import Link from "next/link"
import { useMoralis } from "react-moralis"
const Footer = () => {
  const { account } = useMoralis()
  return (
    <div className='footer border-secondary-100 bg-primary-900 text-light border-t'>
      <div className='container mx-auto flex flex-col justify-between px-12 pt-12 xl:flex-row xl:px-32'>
        <div>
          <h1 className='xl:text-start text-secondary-100 text-center text-3xl font-semibold'>
            NFT Explorer
          </h1>
        </div>
        <div className='mt-12 text-center xl:text-left'>
          <h1 className='text-xl font-semibold'>Quick Link</h1>
          <ul className='mt-4'>
            <li className='mb-1'>
              <Link href='/'>Home</Link>
            </li>
            <li className='mb-1'>
              <Link href='/marketplace'>Marketplace</Link>
            </li>
            <li className='mb-1'>
              <Link href='/launchpad'>Launchpad</Link>
            </li>
            {account && (
              <li className='mb-1'>
                <Link href={`/user/${account}`}>Your NFTs</Link>
              </li>
            )}
          </ul>
        </div>
        <div className='mt-12 text-center xl:text-left'>
          <h1 className='text-xl font-semibold'>Resources</h1>
          <ul className='mt-4'>
            <li className='mb-1'>
              <a href='https://moralis.io/' target='_blank' rel='noopener noreferrer'>
                Moralis
              </a>
            </li>
            <li className='mb-1'>
              <a href='https://1inch.io/' target='_blank' rel='noopener noreferrer'>
                1Inch
              </a>
            </li>
            <li className='mb-1'>
              <a href='https://metamask.io/' target='_blank' rel='noopener noreferrer'>
                Metamask
              </a>
            </li>
            <li className='mb-1'>
              <a href='https://ethereum.org/en/' target='_blank' rel='noopener noreferrer'>
                Ethereum
              </a>
            </li>
            <li className='mb-1'>
              <a href='https://bitcoin.org/en/' target='_blank' rel='noopener noreferrer'>
                Bitcoin
              </a>
            </li>
          </ul>
        </div>
        <div className='mt-12 text-center xl:text-left'>
          <h1 className='mb-5 text-xl font-semibold'>Buy Crypto</h1>
          <div className='flex flex-wrap justify-center xl:w-96 xl:justify-start '>
            <a
              href='https://accounts.binance.me/en/register?ref=SE9CN8ZU'
              target='_blank'
              rel='noopener noreferrer'>
              <img src={BINANCEIcon.src} className='m-1 mr-5 h-full w-24' alt='' />
            </a>
            <a href='https://www.bitmex.com/' target='_blank' rel='noopener noreferrer'>
              <img src={BITMEXIcon.src} className='m-1 mr-5 h-full w-24' alt='' />
            </a>
            <a href='https://www.huobi.com/en-us/ ' target='_blank' rel='noopener noreferrer'>
              <img src={HUOBIIcon.src} className='m-1 mr-5 h-full w-24' alt='' />
            </a>
            <a href='https://www.coinbase.com/' target='_blank' rel='noopener noreferrer'>
              <img src={COINBASEIcon.src} className='m-1 mr-5 h-full w-24' alt='' />
            </a>
          </div>
        </div>
      </div>
      <div className='container mx-auto flex justify-between px-32 pt-8 pb-4 text-[rgba(255,255,255,0.5)]'>
        <p>Copyright &copy; 2021</p>
        <a href='http://ikorchev.com' target='_blank' rel='noopener noreferrer'>
          ikorchev.com
        </a>
      </div>
    </div>
  )
}

export default Footer
