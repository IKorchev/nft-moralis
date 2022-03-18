import React, { useState } from "react"
import SectionTitle from "../../components/SectionTitle"
import { toast } from "react-toastify"
import { useChain, useMoralis } from "react-moralis"
import { useRecoilState } from "recoil"
import { chainState } from "../../store/userSlice"
const Add = () => {
  const { authenticate, Moralis } = useMoralis()
  const chain = useRecoilState(chainState)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      address: e.target.add_address.value,
      chain: chain.chainId,
      collectionName: e.target.add_name.value,
      imageUrl: e.target.add_image_url.value,
      description: e.target.add_description.value,
    }
    const toastId = toast.loading("Awaiting signature", {
      position: toast.POSITION.TOP_LEFT,
      closeButton: true,
      closeOnClick: true,
    })
    try {
      await authenticate({ chainId: chain.chainId })
      const session = await Moralis.Session.current()
      const _res = await fetch("/api/collection", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.attributes.sessionToken,
        },
        body: JSON.stringify(formData),
      })
      const res = await _res.json()
      if (!_res.ok) {
        toast.update(toastId, {
          isLoading: false,
          type: "error",
          render: `Error: ${res.error || _res.statusText}`,
          autoClose: 8000,
        })
      } else {
        toast.update(toastId, {
          isLoading: false,
          type: "success",
          render: `Success: ${res.message}`,
          autoClose: 8000,
        })
        e.target.reset()
      }
    } catch (error) {
      toast.update(toastId, {
        isLoading: false,
        type: "error",
        render: `Error: Signature required`,
        autoClose: 8000,
      })
    }
  }

  return (
    <div className='container mx-auto min-h-[20rem] py-24'>
      <div className='flex justify-center'>
        <SectionTitle title='Add a collection' />
      </div>
      <div
        style={{
          backgroundImage: "url('/Group_1.png')",
          backgroundSize: "contain",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
        className='container p-5'>
        <div className='from-secondary-600/80 to-primary-700/80 shadow-glass-small mx-auto mt-20 max-w-[30rem] bg-gradient-to-br  p-5 backdrop-blur-sm backdrop-filter'>
          <form onSubmit={handleSubmit} className=' text-white'>
            <div className='flex flex-col'>
              <label htmlFor='add_address'>Contract Address *</label>
              <input
                className='bg-secondary-800/60 border-secondary-100 shadow-glass-small mt-1 rounded border backdrop-blur-sm backdrop-filter'
                type='text'
                id='add_address'
              />
            </div>
            <div className='mt-2 flex flex-col'>
              <label htmlFor='add_name'>Name</label>
              <input
                className='bg-secondary-800/60 border-secondary-100 shadow-glass-small mt-1 rounded border backdrop-blur-sm backdrop-filter'
                type='text'
                id='add_name'
              />
              <p className='px-2 pt-1 text-xs'>Leave blank to use the original contract name</p>
            </div>
            <div className='mt-2 flex flex-col'>
              <label htmlFor='add_image'>Image URL</label>
              <input
                className='bg-secondary-800/60 border-secondary-100 shadow-glass-small mt-1 rounded border backdrop-blur-sm backdrop-filter'
                type='url'
                id='add_image_url'
              />
            </div>
            <div className='mt-2 flex flex-col'>
              <label htmlFor='add_description'>Description</label>
              <textarea
                rows={5}
                placeholder='Briefly describe what the collection is about'
                className='bg-secondary-800/60 border-secondary-100 shadow-glass-large mt-1 rounded border text-sm backdrop-blur-sm backdrop-filter'
                id='add_description'
              />
            </div>

            <div className='mt-2 flex flex-col'>
              <label htmlFor='add_description ' className='sr-only'>
                Submit
              </label>
              <input
                className='bg-secondary-400 hover:bg-secondary-600 focus:bg-secondary-600 cursor-pointer rounded border-none py-2 ring-blue-600 transition duration-150 focus:outline-none focus:ring-2'
                type='submit'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add
