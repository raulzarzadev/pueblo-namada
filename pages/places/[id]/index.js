import { selectPlaceState } from '@/store/slices/placeSlice'
import { useSelector } from 'react-redux'
import PrivatePage from '../../../components/HOC/PrivatePage'
import PlaceDetails from '../../../components/Place/PlaceDetails'

export default function Place () {
  const place = useSelector(selectPlaceState)
  if (place.isLoading) return <div>Loading ...</div>
  if (place.isEmpty) {
    return (
      <div className='h-screen flex w-full justify-center items-center flex-col'>
        { 'This place do not exist' }
        <button
          className='btn btn-outline'
          onClick={ () => back() }
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
