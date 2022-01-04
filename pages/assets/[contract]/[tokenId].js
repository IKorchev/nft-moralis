const ethers = require("ethers")
import { NFT_ABI, MARKET_ABI, MARKET_ADDRESS } from "../../../utils/ABIS"
import React, { useState } from "react"
import { formatIpfs } from "../../../utils/common"
import { shortenAddress } from "@usedapp/core"
import Moralis from "moralis"
import { useChain } from "react-moralis"

const Token = ({ nftData, contractAddress, tokenId, transactions, owner }) => {
  const { chain } = useChain()
  const [loaded, setLoaded] = useState(false)
  return (
    <div className='container px-24 pb-12 mx-auto  text-white'>
      <div className='items-start gap-1 grid grid-cols-5 mt-5'>
        <div className='w-max col-span-2'>
          <img
            src={formatIpfs(nftData.url || nftData.image_url || nftData.image)}
            className='object-contain max-h-[500px] rounded-lg'
            onLoad={(e) => setLoaded(true)}
            placeholder='https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif'
          />
          <details className='bg-primary-900 mt-2 border p-5 rounded-lg shadow-lg text-white'>
            <summary className='text-lg font-semibold'>Details</summary>
            <p className='mt-5'>
              <span className='font-bold'> Address:</span> {contractAddress}
            </p>
            <p className='mt-2'>
              <span className='font-bold'> Token ID:</span> {tokenId}
            </p>
          </details>
          <details className='bg-primary-900 mt-2 border p-5 rounded-lg shadow-lg text-white max-w-[500px]'>
            <summary className='text-lg font-semibold'>Attributes</summary>
            <div className='grid grid-cols-3 gap-3 mt-4'>
              {nftData.attributes?.map((el) => (
                <div className='col-span-1 text-black grid place-items-center bg-purple-200 border-purple-300 text-center p-1 rounded-lg'>
                  <small className='font-bold'>{el.trait_type}</small>
                  <small>{el.value}</small>
                </div>
              ))}
            </div>
          </details>
        </div>

        <div className='bg-primary-900 col-span-3 text-white px-5 rounded-lg'>
          <h2 className='text-white'>{nftData.name}</h2>
          <p className='mt-5'>Owned by: {owner} </p>
          <hr />
          <h2 className='mt-12 text-white'>Description</h2>
          <p className='mt-4'>{nftData.description}</p>
          <div className='mt-5'>
            <h2 className='text-white'>Transactions</h2>
            <table className='w-full border-separate border border-purple-400 mt-3'>
              <tr className='bg-purple-800 border '>
                <th>From</th>
                <th>To</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
              {transactions?.map((el) => {
                const d = new Date(el.block_timestamp)

                return (
                  <tr className='w-full p-2  my-1 text-center'>
                    <td>{shortenAddress(el.from_address)}</td>
                    <td>{shortenAddress(el.to_address)}</td>
                    <td>
                      {Moralis.Units.FromWei(el.value)} {chain?.nativeCurrency.symbol}
                    </td>
                    <td>{d.toLocaleDateString("uk")}</td>
                  </tr>
                )
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Token

export const getServerSideProps = async (context) => {
  const chain = "ropsten"
  const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL + chain)
  const { tokenId, contract } = context.query
  const transactionsUrl = `https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}/transfers?chain=${chain}&format=decimal`
  const nftContract = new ethers.Contract(contract, NFT_ABI, provider)
  const tokenURI = await nftContract.tokenURI(tokenId)
  const owner = await nftContract.ownerOf(tokenId)
  const nftData = await fetch(formatIpfs(tokenURI)).then((res) => res.json())
  //prettier-ignore
  const transactions = await fetch(transactionsUrl, {headers: { "x-api-key": process.env.API_KEY },}).then((res) => res.json())

  return {
    props: {
      nftData,
      contractAddress: contract,
      tokenId: tokenId,
      transactions: transactions.result,
      owner,
    },
  }
}
