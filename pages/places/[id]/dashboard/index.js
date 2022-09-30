import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectPlaceState } from '@/store/slices/placeSlice'
import DashboardPlace from 'comps/Place/DashboardPlace'
import PrivatePage from 'comps/HOC/PrivatePage'

export default function dashboard () {
  const place = useSelector(selectPlaceState)

  return (
    <>
      <Head>
        <title>Dashboard Place</title>
      </Head>
      <PrivatePage
        permissionTo='owner'
        elementOwner={ place?.userId }
      >

        <DashboardPlace
          showTable
          showPaymentsTable
          showOperatingCosts
          showPlaceDetails
        />
      </PrivatePage>

    </>
  )
}
