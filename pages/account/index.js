import { shortenAddress, useEthers } from "@usedapp/core"
import { useEffect, useState } from "react"
import { useChain, useMoralis, useMoralisWeb3Api } from "react-moralis"
import SkeletonDashboard from "../../components/SkeletonDashboard"
const Account = () => {
  const { Moralis } = useMoralis()
  const { account, chainId } = useChain()
  const [tokens, setTokens] = useState([])

  useEffect(async () => {
    if (!account) return
    const balances = await Moralis.Web3API.account.getTokenBalances({
      address: account,
      chain: chainId,
    })
    setTokens(balances)
  }, [account, chainId])

  return (
    <div className='h-screen flex items-center justify-center'>
      {!tokens.length && <SkeletonDashboard />}
      {tokens.length && (
        <div className='pt-5 min-h-[550px] lg:min-w-[800px] bg-primary-lightest backdrop-filter backdrop-blur-md bg-opacity-5 rounded-lg p-5 shadow-4xl min-h-96'>
          <h1 className='font-semibold text-2xl text-light flex items-center justify-between'>
            <span>Dashboard</span>
            <span>
              Chain: <span className='uppercase'>{chainId}</span>
            </span>
            <span className='text-sm'>Account: {account && shortenAddress(account)}</span>
          </h1>
          <div className='rounded-lg mt-12 overflow-hidden border border-primary shadow-lg'>
            <table className='text-white text-left mx-auto  w-full rounded-t-lg'>
              <thead className='bg-primary-lightest bg-opacity-50'>
                <th>Name</th>
                <th>Symbol</th>
                <th>Token Address</th>
                <th>Balance</th>
              </thead>
              {tokens.map((el) => {
                const { balance, symbol, name, decimals, token_address } = el
                const fixedBalance = (balance / 10 ** decimals).toFixed(2)
                return (
                  <tbody className='even:bg-primary-dark even:bg-opacity-60'>
                    <tr key={symbol}>
                      <td>{name}</td>
                      <td>{symbol}</td>
                      <td>{shortenAddress(token_address)}</td>
                      <td>
                        {fixedBalance} {symbol}
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Account
