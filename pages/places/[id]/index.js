import { selectPlaceState } from '@/store/slices/placeSlice'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PrivatePage from '../../../components/HOC/PrivatePage'
import PlaceDetails from '../../../components/Place/PlaceDetails'
import { listenPlace } from '../../../firebase/Places/main'

export default function Place() {
  const place = useSelector(selectPlaceState)
  if (place.isLoading) return <div>Loading ...</div>
  if (place.isEmpty) {
    return (
      <div className='h-screen flex w-full justify-center items-center flex-col'>
        {'This place do not exist'}
        <button
          className='btn btn-outline'
          onClick={() => back()}
        >
          Back
        </button>
      </div>
    )
  }
  return (
    <PrivatePage permissionTo='public'>
      <div className='max-w-md mx-auto'>
        <PlaceDetails />
      </div>
    </PrivatePage>
  )
}
