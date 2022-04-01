import Loading from "../../../components/Other/Loading"
import Metadata from "../../../components/Other/Metadata"
import Main from "../../../components/tokenId/Main"
import { useRouter } from "next/router"
import { Suspense } from "react"

const Token = () => {
  const router = useRouter()
  const { contract, tokenId } = router.query
  
  return (
    <div>
      <Metadata
        title={`NFT Explorer |  - #${tokenId}`}
        description={`NFT Explorer | NFT Token - - #${tokenId}`}
        url={`https://nft-moralis.vercel.app${router.asPath}`}
      />
      <Suspense fallback={<Loading />}>
        <Main contract={contract} tokenId={tokenId} />
      </Suspense>
    </div>
  )
}

export default Token
