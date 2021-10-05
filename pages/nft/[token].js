import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMoralis } from "react-moralis"

const Token = ({ data }) => {
  const metadata = JSON.parse(data.metadata)

  return (
    <div className='flex'>
      <img src={metadata.image} alt='' />
      <div>
        <h1> Token Name: {data.name}</h1>
        <p>NFT Name: {metadata.name}</p>
        <p>{metadata.description}</p>
        <p>{data.contract_type}</p>
        <p>{data.address}</p>
        <p>{data.id}</p>
        <p>{data.amount}</p>
        <a href={data.uri}>Token URI</a>
        <div>
          {metadata.attributes?.map((el) => (
            <div className='capitalize' key={el.trait_type}>
              <span>{el.trait_type.replace("_", " ")}: </span>
              <span>{el.value.toString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Token

export async function getServerSideProps(context) {
  const Moralis = require("moralis/node")

  console.log(context.query)
  const result = await fetch(
    ` https://deep-index.moralis.io/api/v2/nft/${context.query.token}/${context.query.id}?chain=polygon&format=decimal`,
    { headers: { "X-API-KEY": process.env.API_KEY, accept: "application/json" } }
  )
  const data = await result.json()

  return {
    props: {
      data,
    },
  }
}
