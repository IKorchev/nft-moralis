import { useMoralis } from "react-moralis"
import { shortenIfAddress } from "@usedapp/core"
import Jazzicon from "../../Jazzicon"
import { ChevronDownIcon } from "@heroicons/react/solid"

const AccountAndBalance = ({ icon = true }) => {
  const { account } = useMoralis()
  return (
    <div className='mx-auto w-full flex'>
      <div className='relative flex justify-center items-center text-light bg-secondary rounded-md cursor-pointer px-2 py-1 mx-1 '>
        <span className='mr-3'>{account && shortenIfAddress(account)}</span>
        <Jazzicon address={account} size={18} />
        {icon && <ChevronDownIcon className='ml-2 h-5 w-5' />}
      </div>
    </div>
  )
}

export default AccountAndBalance
