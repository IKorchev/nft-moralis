# NFT Marketplace

This project is built with Next.js and TailwindCSS powered by Moralis.


> Note: *this project is not production ready. The smart contract is very simple and not verified.
> It is built with the purpose of learning Web3 and interacting with smart contracts on the blockchain*


There is still a lot to be build, such as admin SDK where you'd be able to change the Launchpad smart contract ABI, add more Launchpads (currently it's only possible through the moralis admin sdk) etc.

[Check out the demo](https://nft-moralis.vercel.app/)

##  Prerequisites 

1. Understanding of how the blockchain works.
2. You have worked with the Ethereum Web3 API.
3. You have used MetaMask in your browser. MetaMask is not only a wallet, it allows websites to interact with your wallet, and sign to verify that you are the owner of that wallet.
4. You are familiar with smart contracts and smart contract events.
5. You have worked with different chains such as mainnet, testnet, or Ganache (Ganache is your own local development chain)

## Smart contract

[Find the smart contract code here](https://github.com/davepartner/opensea-clone/blob/main/contracts/NFTMarket.sol)

It is deployed to ropsten network but it can be deployed on any EVM compatible network (that is supported by Moralis). 

## What is Moralis and why we need it?

Moralis is a library that gives you access to the powerful Moralis Server backend from your JavaScript app.
I would encourage anyone to go and [read their docs](https://docs.moralis.io/) if interested in building Web3 and Blockchain applications.

They do blockchain address and contracts indexing and sync.
Moralis helps with keeping our contract synced with our app and keeps the data saved to our server database.

[Create server here](https://admin.moralis.io/login)

The server is then configured to listen to our Smart Contract Event whenever an item is added.

[Learn how to do this here](https://docs.moralis.io/moralis-server/automatic-transaction-sync/smart-contract-events)

Once you have synced the smart contract event, every time the event occurs Moralis will add an item to the database field. Those will be the NFTs that users add to the Market contract.

Now we query the Moralis database with the hook useMoralisQuery to get all the Items that were listed.

## The Launchpad

> NOTE: There are many ways this can be done. For the sake of time I've done it with simple Moralis database object.

For the launchpad I have created a separate object in the database with the following structure (outside of the predefined defaults by Moralis): 

```javascript
{
  contractAddress: string,  // the address of the NFT contract
  imageUrl: string,
  finished: bool, // indicating if launchpad is still ongoing (still in minting phase)
  description: string, // description of the collection
  startDate: date,  // when launchpad starts note 
  // NOTE:this will not prevent users from minting
  // The contract owner needs to make sure
  // the minting is disabled until this date to prevent people from minting prior to launch
  isUpcoming: bool, // 
}
```
Then we query the data for the project and display it to the user.






