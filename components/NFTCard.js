import { useEffect, useState, useCallback } from "react"
import { formatImage } from "../utils/common"
import marketInteractions from "../utils/marketInteractions"
import Modal from "react-modal"
import XIcon from "@heroicons/react/outline/XIcon"
import Link from "next/link"
export const SellModal = ({ sellItem, isOpen, setIsOpen, tokenInfo }) => {
  const imageSource = formatImage(tokenInfo?.image) || formatImage(tokenInfo?.image_url)
  const [price, setPrice] = useState(1)

  return (
    <Modal
      isOpen={isOpen}
      className='w-max h-96 bg-white m-auto'
      onRequestClose={() => setIsOpen(false)}
      contentLabel='Example Modal'>
      <div className='relative flex-col max-w-max text-black  bg-opacity-90 mx-auto flex  rounded-md mt-24 overflow-y-auto overflow-x-hidden'>
        <button
          className='absolute top-2 right-2 hover:opacity-90'
          onClick={() => setIsOpen(false)}>
          <XIcon className='h-6 w-6' color='black' />
        </button>
        <img
          src={imageSource}
          alt=''
          className='h-72 max-h-72 cursor-pointer object-contain'
        />
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sellItem(price)
          }}
          className='border'>
          <label htmlFor='numberInput'>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id='numberInput'
            className='border'
          />
          <button type='submit'>List for sale</button>
        </form>
      </div>
    </Modal>
  )
}

const NFTCard = ({ data, metadata }) => {
  const [isShown, setIsShown] = useState(false)
  const [metaData, setMetadata] = useState()
  const { listItem } = marketInteractions()
  useEffect(() => {
    const getData = async () => {
      if (metadata) {
        setMetadata(metadata)
      } else {
        try {
          const tokenIdMetadata = await fetch(data.tokenUri)
          const parsedMetadata = await tokenIdMetadata.json()
          setMetadata(JSON.parse(parsedMetadata))
          console.log(tokenIdMetadata)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getData()
  }, [])
  const listForSale = (price) => {
    listItem(data.token_address, data.token_id, price)
  }
  return (
    <div className='card'>
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsShown(true)
        }}>
        <img
          src={formatImage(metaData?.image) || formatImage(metaData?.image_url)}
          alt=''
          className='h-72 max-h-72 cursor-pointer'
        />
      </button>
      <div className='flex flex-col h-36 justify-between text-left w-full px-4'>
        <h1 className='text-lg font-bold truncate'>
          {metaData?.name || metaData?.Name || metaData?.title || "Unnamed"}
        </h1>
        <p className='w-full h-12 overflow-hidden'>
          {metaData?.description || "No available description for this NFT."}
        </p>
        <Link href={`/assets/${data?.token_address}/`}>Goasd</Link>

        <button
          onClick={() => setIsShown(true)}
          role='button'
          className='w-1/2 text-center bg-primary-lightest py-1 rounded-md text-white font-semibold transition duration-1000 hover:bg-pinkish'>
          Learn more
        </button>
        {/* <NFTModal
            tokenInfo={metaData}
            data={data}
            isShown={isShown}
            setIsShown={setIsShown}
          /> */}
        <button onClick={() => setIsShown(true)}>Sell now</button>
        <SellModal
          sellItem={listForSale}
          tokenInfo={metaData}
          isOpen={isShown}
          setIsOpen={setIsShown}
        />
      </div>
    </div>
  )
}

export default NFTCard
