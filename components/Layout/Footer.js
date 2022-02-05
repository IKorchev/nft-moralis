import COINBASEIcon from "../../assets/coinbase.svg"
import BINANCEIcon from "../../assets/binance.svg"
import BITMEXIcon from "../../assets/bitmex.svg"
import HUOBIIcon from "../../assets/huobi.svg"
import Link from "next/link"
const Footer = () => {
  return (
    <div className='footer bg-primary-900 text-light border-t border-secondary'>
      <div className='container px-12 xl:px-32 mx-auto flex flex-col xl:flex-row justify-between pt-12'>
        <div>
          <h1 className='font-semibold text-3xl text-pink-400 text-center xl:text-start'>
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
              <Link href='/explore'>Explore</Link>
            </li>
            <li className='mb-1'>
              <Link href='/swap'>Swap</Link>
            </li>
            <li className='mb-1'>
              <Link href='/mint'>Mint</Link>
            </li>
          </ul>
        </div>
        <div className='mt-12 text-center xl:text-left'>
          <h1 className='text-xl font-semibold'>Resources</h1>
          <ul className='mt-4'>
            <li className='mb-1'>
              <a href='/' target='_blank' rel='noopener noreferrer'>
                Moralis
              </a>
            </li>
            <li className='mb-1'>
              <a href='/' target='_blank' rel='noopener noreferrer'>
                1Inch
              </a>
            </li>
            <li className='mb-1'>
              <a href='/' target='_blank' rel='noopener noreferrer'>
                Metamask
              </a>
            </li>
            <li className='mb-1'>
              <a href='/' target='_blank' rel='noopener noreferrer'>
                Ethereum
              </a>
            </li>
            <li className='mb-1'>
              <a href='/' target='_blank' rel='noopener noreferrer'>
                Bitcoin
              </a>
            </li>
          </ul>
        </div>
        <div className='mt-12 text-center xl:text-left'>
          <h1 className='text-xl font-semibold mb-5'>Buy Crypto</h1>
          <div className='flex justify-center xl:justify-start flex-wrap xl:w-96 '>
            <a
              href='https://accounts.binance.me/en/register?ref=SE9CN8ZU'
              target='_blank'
              rel='noopener noreferrer'>
              <img src={BINANCEIcon.src} className='w-24 mr-5 h-full m-1' alt='' />
            </a>
            <a href='https://www.bitmex.com/' target='_blank' rel='noopener noreferrer'>
              <img src={BITMEXIcon.src} className='w-24 mr-5 h-full m-1' alt='' />
            </a>
            <a
              href='https://www.huobi.com/en-us/ '
              target='_blank'
              rel='noopener noreferrer'>
              <img src={HUOBIIcon.src} className='w-24 mr-5 h-full m-1' alt='' />
            </a>
            <a href='https://www.coinbase.com/' target='_blank' rel='noopener noreferrer'>
              <img src={COINBASEIcon.src} className='w-24 mr-5 h-full m-1' alt='' />
            </a>
          </div>
        </div>
      </div>
      <div className='flex container px-32 mx-auto justify-between pt-8 pb-4 text-[rgba(255,255,255,0.5)]'>
        <p>Copyright &copy; 2021</p>
        <a href='http://ikorchev.com' target='_blank' rel='noopener noreferrer'>
          ikorchev.com
        </a>
      </div>
    </div>
  )
}

export default Footer