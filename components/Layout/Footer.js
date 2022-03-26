import Link from "next/link"
import { currentUserState } from "../../store/userSlice"
import { useRecoilValue } from "recoil"

const links = [
  { title: "Home", href: "/" },
  { title: "Marketplace", href: "/marketplace" },
  { title: "Launchpad", href: "/launchpad" },
]
const resources = [
  { href: "https://moralis.io/", title: "Moralis" },
  { href: "https://1inch.io/", title: "1inch" },
  { href: "https://metamask.io/", title: "Metamask" },
  { href: "https://ethereum.org/en/", title: "Ethereum" },
  { href: "https://bitcoin.org/en/", title: "Bitcoin" },
]

const Footer = () => {
  const account = useRecoilValue(currentUserState)
  return (
    <div className='footer border-secondary-100 text-light  border-t'>
      <div className='container mx-auto flex flex-col justify-between px-12 pt-12 xl:flex-row xl:px-32'>
        <div>
          <h1 className='xl:text-start text-secondary-100 text-center text-3xl font-semibold'>NFT Explorer</h1>
        </div>
        <div className='mt-12 text-center xl:text-left'>
          <h1 className='text-xl font-semibold'>Quick Link</h1>
          <ul className='mt-4'>
            {links.map(({ href, title }) => {
              return (
                <li key={title} className='mb-1'>
                  <Link href={href}>{title}</Link>
                </li>
              )
            })}
            {account && (
              <li key={title} className='mb-1'>
                <Link href={`/user/${account}`}>Your NFTs</Link>
              </li>
            )}
          </ul>
        </div>
        <div className='mt-12 text-center xl:text-left'>
          <h1 className='text-xl font-semibold'>Resources</h1>
          <ul className='mt-4'>
            {resources.map(({ href, title }) => {
              return (
                <li className='mb-1'>
                  <a href={href} target='_blank' rel='noopener noreferrer'>
                    {title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='mt-12 text-center xl:text-left'>
          <h1 className='mb-5 text-xl font-semibold'>Buy Crypto</h1>
          <div className='flex flex-wrap justify-center xl:w-96 xl:justify-start '>
            <a href='https://accounts.binance.me/en/register?ref=SE9CN8ZU' target='_blank' rel='noopener noreferrer'>
              <img src='/binance.svg' className='m-1 mr-5 h-full w-24' alt='' />
            </a>
            <a href='https://www.bitmex.com/' target='_blank' rel='noopener noreferrer'>
              <img src='/bitmex.svg' className='m-1 mr-5 h-full w-24' alt='' />
            </a>
            <a href='https://www.huobi.com/en-us/ ' target='_blank' rel='noopener noreferrer'>
              <img src='/huobi.svg' className='m-1 mr-5 h-full w-24' alt='' />
            </a>
            <a href='https://www.coinbase.com/' target='_blank' rel='noopener noreferrer'>
              <img src='/coinbase.svg' className='m-1 mr-5 h-full w-24' alt='' />
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
