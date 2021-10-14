import { useRef, useState } from "react"
import { useMoralis } from "react-moralis"

const Mint = () => {
  const { Moralis, web3 } = useMoralis()

  const [file, setFile] = useState()
  const [name, setName] = useState()
  const [contractAddress, setContractAddress] = useState("")
  const [description, setDescription] = useState()
  console.log(Moralis.User.current())
  const uploadMetadata = async () => {
    if (!file) return
    const data = new Moralis.File(file.name, file)
    await data.saveIPFS()
    const imageURI = data.ipfs()
    //prettier-ignore
    const metadata = {
      "name": name,
      "description": description,
      "image": imageURI,
    }
    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    })
    await metadataFile.saveIPFS()
    const metadataURI = metadataFile.ipfs()
    const res = await mintToken(metadataURI)
    console.log(res)
  }

  const mintToken = async (_uri) => {
    //prettier-ignore
    const abi =[
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name_",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "symbol_",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "baseURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenByIndex",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    const nftContract = new web3.eth.Contract(
      abi,
      "0x9f92dd963c02d6390b2ad875a2cfc409b3e360de"
    )
    console.log(nftContract)
    const encFunction = web3.eth.abi.encodeFunctionCall(
      {
        name: "mintToken",
        type: "function",
        inputs: [
          {
            type: "string",
            name: "tokenURI",
          },
        ],
      },
      [_uri]
    )
    const params = {
      to: "0x38B97890670EC6193e317183bB16406f22DD225A",
      from: Moralis.User.current().attributes.ethAddress,
      data: encFunction,
    }
    const res = await ethereum.request({
      method: "eth_sendTransaction",
      params: [params],
    })
    console.log(res)
  }

  return (
    <div className='h-screen '>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          uploadMetadata()
        }}
        className='bg-primary-900 rounded-lg w-96 mt-32 mx-auto text-light flex flex-col shadow-4xl p-8 bg-opacity-10 backdrop-filter backdrop-blur-md'>
        <h2 className='-mt-2 mb-5 text-pink-200'>Mint your NFT</h2>
        <div className='flex flex-col '>
          <label htmlFor='contract'>Contract Address</label>
          <input
            id='contract'
            type='text'
            onChange={(e) => setName(e.target.value)}
            className='bg-transparent border-pinkish border rounded-md  px-2 py-1'
          />
        </div>
        <div className='flex flex-col  mt-5'>
          <label htmlFor='name'>NFT Name</label>
          <input
            id='name'
            type='text'
            onChange={(e) => setName(e.target.value)}
            className='bg-transparent border-pinkish border rounded-md  px-2 py-1'
          />
        </div>

        <div className='flex flex-col  mt-2'>
          <label htmlFor='description'>NFT Description</label>
          <textarea
            id='description'
            rows='3'
            className='bg-transparent border-pinkish border rounded-md  px-2 py-1'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <label
          htmlFor='file'
          className='mt-5 border focus-within:ring ring-yellow-400 shadow-4xl text-black  bg-white relative border-pinkish rounded-md  transform cursor-pointer py-1 font-semibold transition hover:bg-primary-lightest'>
          <input
            id='file'
            tabIndex='0'
            type='file'
            className='opacity-0 cursor-pointer border '
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span className='absolute w-full left-0 text-center top-1/2 transform -translate-y-1/2'>
            Upload image
          </span>
        </label>
        <button
          type='submit'
          className=' bg-primary-lightest text-white font-bold border border-pinkish rounded-lg p-2 mt-5 transition shadow-4xl hover:bg-primary focus:border-red-400'
          placeholder='Image'>
          MINT
        </button>
      </form>
    </div>
  )
}

export default Mint
