import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FormPlaceConfig from '../../../../components/FormPlaceConfig'
import PlaceDetails from '../../../../components/Places/PlaceDetails'
import { listenPlace } from '../../../../firebase/places'
import PlaceGuests from '../../../../components/Places/PlaceGuests'
import Section from '../../../../components/Section'
import PrivatePage from '../../../../components/HOC/PrivatePage'

export default function dashboard () {
  const [place, setPlace] = useState(undefined)
  const {
    query: { id }
  } = useRouter()

  useEffect(() => {
    listenPlace(id, setPlace)
  }, [])

  return (
    <PrivatePage permissionTo="owner" elementOwner={place?.userId}>
      <div className="max-w-lg mx-auto">
        <h1 className="text-center font-bold border">Dashboard</h1>

        {place && (
          <>
            <Section
              title={'Detalles del lugar'}
              subtitle={`${place?.name || ''}`}
              sticky>
              <PlaceDetails place={place} />
            </Section>
            <FormPlaceConfig place={place} />
            <PlaceGuests
              place={place}
              showTable
              showPaymentsTable
              showOperatingCosts
            />
          </>
        )}
      </div>
    </PrivatePage>
  )
}
