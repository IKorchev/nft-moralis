import Loading from "../../../components/Other/Loading"
import Metadata from "../../../components/Other/Metadata"
import Main from "../../../components/tokenId/Main"
import { useRouter } from "next/router"
import { Suspense } from "react"

const ErrorComponent = () => {
  return (
    <h1 className='grid h-screen place-items-center text-center text-4xl text-white'>
      Couldn't fetch data for this token.
      <br /> or this token does not exist
    </h1>
  )
}

const Token = () => {
  const router = useRouter()
  return (
    <div>
      <Metadata
        title={`NFT Explorer |  - #${router.query?.tokenId}`}
        description={`NFT Explorer | NFT Token - - #${router.query?.tokenId}`}
        url={`https://nft-moralis.vercel.app${router.asPath}`}
      />
      <Suspense fallback={<Loading />}>
        <Main contract={router.query?.contract} tokenId={router.query?.tokenId} />
      </Suspense>
    </div>
  )
}

export default Token
