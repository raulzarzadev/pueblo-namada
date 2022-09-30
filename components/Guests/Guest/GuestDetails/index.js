import React from 'react'
import { useRouter } from 'next/router'
import SendIcon from '../../../icons/SendIcon'
import PreviewImage from '../../../PreviewImage'
import RequestsTable from 'comps/Place/RequestsTable'
import Section from 'comps/Section'

export const GuestDetails = ({ guest }) => {
  const router = useRouter()
  const {
    id,
    name,
    plates,
    phone,
    email,

    publicImage,
    imageID
  } = guest
  console.log(guest)
  const DOMAIN = 'https://peace-parking.vercel.app'
  const PLACE_URL = `${DOMAIN}/places/${id}`

  const CONTENT_INFO = `Te damos la bienvenida a ${name}. Puedes ver mas detalles del lugar en ${PLACE_URL}`
  const SUBJECT_INFO = `Bienvenido a ${name}`


  return (
    <div className='max-w-xl mx-auto'>
      <p>
        <span className='font-bold'>Name:</span>{ ' ' }
        { guest?.name }
      </p>
      { plates && (
        <p>
          <span className='font-bold '>License Plates:</span>{ ' ' }
          { plates }
        </p>
      ) }
      { phone && (
        <div className='flex'>
          <span className='font-bold'>Phone:</span>{ ' ' }
          { phone }
          <a
            className='flex mx-2'
            target='_blank'
            href={ `https://wa.me/${phone}?text=${CONTENT_INFO}` }
            rel='noreferrer'
          >
            ws <SendIcon />
          </a>
        </div>
      ) }
      { email && (
        <div className='flex'>
          <span className='font-bold'>Email:</span> { email }
          <a
            target='_blank'
            className=' '
            href={ `mailto:${email}?subject=${SUBJECT_INFO}&body=${CONTENT_INFO}` }
            rel='noreferrer'
          >
            <SendIcon />
          </a>
        </div>
      ) }

      {/* Images section  */ }
      <div className='sm:flex sm:justify-evenly'>
        <PreviewImage
          label='Public image:'
          image={ publicImage }
        />

        <PreviewImage label='ID image' image={ imageID } />
      </div>
      {/* Images section */ }

      {/* List of requests accomodations  */ }
      <Section title={ 'All requests' } subtitle={ `(${guest?.roomRequests?.length})` }>
        <RequestsTable requests={ guest?.roomRequests } />
      </Section>
    </div>
  )
}
