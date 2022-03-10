import { useMoralis } from "react-moralis"
import { shortenIfAddress } from "@usedapp/core"
import { ChevronDownIcon } from "@heroicons/react/solid"
import Jazzicon from "../../Other/Jazzicon"

const AccountAndBalance = ({ icon = true }) => {
  const { account } = useMoralis()
  return (
    <div className='mx-auto flex w-full'>
      <div className='bg-secondary-100 text-light relative mx-1 flex cursor-pointer items-center justify-center rounded-md px-2 py-1 '>
        <span className='mr-3'>{account && shortenIfAddress(account)}</span>
        <Jazzicon address={account} size={18} />
        {icon && <ChevronDownIcon className='ml-2 h-5 w-5' />}
      </div>
    </div>
  )
}

export default AccountAndBalance
