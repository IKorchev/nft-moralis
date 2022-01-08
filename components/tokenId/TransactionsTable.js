import ExternalLinkIcon from "@heroicons/react/solid/ExternalLinkIcon"
import { shortenIfAddress, shortenTransactionHash } from "@usedapp/core"
import Moralis from "moralis"
import Link from "next/link"
import { useChain } from "react-moralis"

const TransactionsTable = ({ transactions }) => {
  console.log(transactions)

  return (
    <table className='w-full border-separate border border-purple-400 mt-3'>
      <tbody>
        <tr className='bg-purple-800 border '>
          <th>Tx Hash</th>
          <th>From</th>
          <th>To</th>
          <th>Price</th>
          <th>Date</th>
        </tr>
        {transactions?.result.map((el) => (
          <TableRow
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

const TableRow = ({ blockTimestamp, transactionHash, fromAddress, toAddress, price }) => {
  const { chain } = useChain()
  const date = new Date(blockTimestamp).toLocaleString("uk")
  return (
    <tr key={transactionHash} className='w-full p-2  my-1 text-center'>
      <td>
        <a
          target='_blank'
          rel='noreferrer'
          href={`${chain.blockExplorerUrl}/tx/${transactionHash}`}>
          <span className='flex items-center justify-center cursor-pointer'>
            {shortenTransactionHash(transactionHash)}
            <ExternalLinkIcon className='ml-2 h-5 w-5' />
          </span>
        </a>
      </td>
      <td>
        <Link passHref href={`/user/${fromAddress}`}>
          <span className='flex items-center justify-center cursor-pointer'>
            {shortenIfAddress(fromAddress)}
            <ExternalLinkIcon className='ml-2 h-5 w-5' />
          </span>
        </Link>
      </td>
      <td>
        <Link passHref href={`/user/${toAddress}`}>
          <span className='flex items-center justify-center cursor-pointer'>
            {shortenIfAddress(toAddress)}
            <ExternalLinkIcon className='ml-2 h-5 w-5' />
          </span>
        </Link>
      </td>
      <td>
        {Moralis.Units.FromWei(price)} {chain?.nativeCurrency?.symbol}
      </td>
      <td>{date}</td>
    </tr>
  )
}

export default TransactionsTable
