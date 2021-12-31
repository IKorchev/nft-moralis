import Modal from "react-modal"
import XIcon from "@heroicons/react/outline/XIcon"
import ChevronUpIcon from "@heroicons/react/outline/ChevronUpIcon"
import { useState } from "react"
import { formatImage } from "../utils/common"
const NFTModal = ({ data, tokenInfo, isShown, setIsShown }) => {
  const { image_url, image, name, description, attributes } = tokenInfo || {}
  const { token_uri, token_id, token_address } = data || {}
  const [showAttributes, setShowAttributes] = useState(false)
  const toggleAttributes = () => {
    setShowAttributes((state) => !state)
  }

  return (
    <div>
      <Modal
        className='w-max mx-auto shadow-3xl'
        isOpen={isShown}
        onRequestClose={() => setIsShown(false)}
        contentLabel='Modal'>
        <div className='relative max-w-max  text-light bg-primary-dark bg-opacity-90 backdrop-filter backdrop-blur-lg mx-auto flex shadow-2xl rounded-md mt-24 overflow-y-auto overflow-x-hidden'>
          <button
            className='absolute top-2 right-2 hover:opacity-90'
            onClick={() => setIsShown(false)}>
            <XIcon className='h-6 w-6' />
          </button>
          <img src={image || image_url} className='w-96 h-full' />
          <div className='px-12 mt-5 py-5 w-96 '>
            <h1 className='text-semibold font-bold text-2xl'>{name || "Unnamed"}</h1>
            <h1 className='font-semibold mt-5'>Description</h1>
            <p className='overflow-x-hidden text-sm max-h-24 leading-5 overflow-y-auto custom-scroll py-2 rounded-lg'>
              {description || "No available description for this NFT."}
            </p>
            {attributes && (
              <div className='mt-4 border border-primary-lightest rounded-md '>
                <button
                  onClick={toggleAttributes}
                  className={`w-full text-left flex justify-between items-center rounded-sm  text-light ${
                    showAttributes ? "bg-primary-lightest" : "bg-primary-light"
                  } `}>
                  <h1 className='font-semibold px-2'>Attributes</h1>
                  <ChevronUpIcon
                    className={`h-3 px-2 transform transition duration-300 ${
                      showAttributes ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`text-center flex-wrap max-h-48 py-2 overflow-y-auto custom-scroll  ${
                    showAttributes ? "flex" : "hidden"
                  }`}>
                  {attributes.length > 0 &&
                    attributes.map((el, i) => {
                      return (
                        <div
                          key={i}
                          className='flex flex-wrap mx-2 flex-col items-between'>
                          <small className='font-semibold capitalize'>
                            {el.trait_type && el.trait_type.replace("_", " ")}
                          </small>
                          <div className='bg-primary-lightest text-white rounded-sm grid place-items-center w-full'>
                            <small className='capitalize  w-full px-2'>{el.value}</small>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}
            <div className='mt-5'>
              <small className='font-semibold w-full block'>Token Address:</small>
              <small className=''>{token_address}</small>
            </div>
            <div className='mt-4'>
              <small className='font-semibold block'>Token ID:</small>
              <small>{token_id}</small>
            </div>
            <div className='pt-5'>
              <a
                href={token_uri}
                className='bg-primary-lightest rounded-md mt-10 transition duration-300 text-white font-semibold text-sm px-2 py-1   hover:bg-primary-light shadow-3xl'>
                TOKEN URI
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default NFTModal
