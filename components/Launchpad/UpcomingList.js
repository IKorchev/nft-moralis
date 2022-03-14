import React from "react"
import { useRecoilValue } from "recoil"
import { allLaunchpadsState } from "../../store/store"
import { CollectionCard } from "../Cards/CollectionCard"
import SectionTitle from "../SectionTitle"

const UpcomingList = () => {
  const { upcoming } = useRecoilValue(allLaunchpadsState)

  return (
    <section className='divide-secondary container mx-auto divide-y py-6'>
      <div className='my-3 text-left'>
        <SectionTitle size='sm' title='Upcoming' />
      </div>
      <div className='styled-scrollbar bg-primary-900/90 mt-5 flex w-full gap-5 overflow-auto px-2 py-6 backdrop-blur-sm backdrop-filter  '>
        {upcoming.map((el) => (
          <CollectionCard
            key={el.attributes.imageUrl}
            collectionAddress={el.attributes.contractAddress}
            imageUrl={el.attributes.imageUrl}
            name={el.attributes.collectionName}
          />
        ))}
      </div>
    </section>
  )
}

export default UpcomingList
