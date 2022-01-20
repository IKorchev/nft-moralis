import ExternalLinkIcon from "@heroicons/react/solid/ExternalLinkIcon"
import { shortenIfAddress, shortenTransactionHash } from "@usedapp/core"
import Moralis from "moralis"
import Link from "next/link"
import { useChain } from "react-moralis"
import { MARKET_ADDRESS } from "../../utils/ABIS"
const formatAddress = (address) => {
  switch (address) {
    case "0xe6f1a815c66bac5f1d59f802bb2a73aa77b36621":
      return "Market Contract"
    case "0x0000000000000000000000000000000000000000":
      return "Null"
    case MARKET_ADDRESS:
      return "Market Contract"
    default:
      return shortenIfAddress(address)
  }
}
const TransactionsTable = ({ transactions, rowProps, ...props }) => {
  return (
    <table className='border-separate border w-full mx-auto ' {...props}>
      <tbody>
        <tr className='border ' {...rowProps}>
          <th className='text-xs md:text-base'>From</th>
          <th className='text-xs md:text-base'>To</th>
          <th className='text-xs md:text-base'>Price</th>
          <th className='text-xs md:text-base'>Date</th>
          <th className='text-xs md:text-base'>Tx Hash</th>
        </tr>
        {transactions?.result.map((el) => (
          <TableRow
            {...rowProps}
            blockTimestamp={el.block_timestamp}
            transactionHash={el.transaction_hash}
            fromAddress={el.from_address}
            toAddress={el.to_address}
            price={el.value}
          />
        ))}
      </tbody>
    </table>
  )
}

const TableRow = ({
  blockTimestamp,
  transactionHash,
  fromAddress,
  toAddress,
  price,
  ...props
}) => {
  const { chain } = useChain()
  const date = new Date(blockTimestamp).toLocaleDateString("uk")
  return (
    <tr key={transactionHash} className='w-full text-sm my-1 text-center ' {...props}>
      <td>
        <Link passHref href={`/user/${fromAddress}`}>
          <span className='flex items-center justify-center cursor-pointer text-xs md:text-base'>
            {formatAddress(fromAddress)}
            <ExternalLinkIcon className='ml-2 h-5 w-5' />
          </span>
        </Link>
      </td>
      <td>
        <Link passHref href={`/user/${toAddress}`}>
          <span className='flex items-center justify-center cursor-pointer text-xs md:text-base'>
            {formatAddress(toAddress)}
            <ExternalLinkIcon className='ml-2 h-5 w-5' />
          </span>
        </Link>
      </td>
      <td className='text-center text-xs md:text-base'>
        {Moralis.Units.FromWei(price)} {chain?.nativeCurrency?.symbol}
      </td>
      <td className='text-center text-xs md:text-base'>{date}</td>
      <td>
        <a
          target='_blank'
          rel='noreferrer'
          href={`${chain.blockExplorerUrl}/tx/${transactionHash}`}>
          <span className='flex items-center justify-center cursor-pointer text-xs md:text-base'>
            {shortenTransactionHash(transactionHash)}
            <ExternalLinkIcon className='ml-2 h-5 w-5' />
          </span>
        </a>
      </td>
    </tr>
  )
}

export default TransactionsTable
