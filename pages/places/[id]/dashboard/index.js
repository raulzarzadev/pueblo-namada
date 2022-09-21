import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FormPlaceConfig from '../../../../components/FormPlaceConfig'
import PlaceDetails from '../../../../components/Places/PlaceDetails'
import { listenPlace } from '../../../../firebase/Places/main'
import Section from '../../../../components/Section'
import PrivatePage from '../../../../components/HOC/PrivatePage'
import Place from 'components/Place'
import DashboardPlace from '../../../../components/Place/DashboardPlace'
import Head from 'next/head'

export default function dashboard () {
  const [place, setPlace] = useState(undefined)
  const {
    query: { id }
  } = useRouter()

  useEffect(() => {
    listenPlace(id, setPlace)
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard Place</title>
      </Head>
      <PrivatePage permissionTo="owner" elementOwner={place?.userId}>
        <div className="max-w-lg mx-auto">
          <div className="my-4">
            <h2>Dashboard place</h2>
          </div>
          {place && (
            <>
              <Section
                title={'Place details'}
                subtitle={`${place?.name || ''}`}
                sticky>
                <PlaceDetails place={place} />
              </Section>

              <DashboardPlace
                place={place}
                showTable
                showPaymentsTable
                showOperatingCosts
              />
            </>
          )}
        </div>
      </PrivatePage>
    </>
  )
}
