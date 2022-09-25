import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PlaceDetails from '../../../../components/Place/PlaceDetails'
import { listenPlace } from '../../../../firebase/Places/main'
import Section from '../../../../components/Section'
import PrivatePage from '../../../../components/HOC/PrivatePage'
import DashboardPlace from '../../../../components/Place/DashboardPlace'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectPlaceState } from '@/store/slices/placeSlice'

export default function dashboard() {
  const place = useSelector(selectPlaceState)

  return (
    <>
      <Head>
        <title>Dashboard Place</title>
      </Head>
      <PrivatePage
        permissionTo='owner'
        elementOwner={place?.userId}
      >
        <Section
          title={'Place details'}
          subtitle={`${place?.name || ''}`}
          sticky
        >
          <PlaceDetails />
        </Section>

        <DashboardPlace
          showTable
          showPaymentsTable
          showOperatingCosts
        />
      </PrivatePage>
    </>
  )
}
