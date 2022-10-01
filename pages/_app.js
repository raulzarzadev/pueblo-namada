import { wrapper } from '@/store'
import { setCashBalances } from '@/store/slices/cashBalancesSlice'
import {
  setPlace,
  updatePlace
} from '@/store/slices/placeSlice'
import { listenPlaceCashBalances } from '@firebase/CashBalanceV2/main'
import { listenPlace } from '@firebase/Places/main'
import { listenPlaceRoomRequests } from '@firebase/RoomRequests/main'
import { UserProvider } from 'components/context/userContext'
import Layout from 'components/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { INFO } from '../CONSTANTS/PROJECT'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  const { query, route } = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    if (query.id && route.includes('/places/[id]')) {
      listenPlace(query.id, (place) => {
        dispatch(setPlace(place))
      })
      listenPlaceRoomRequests(query.id, (roomRequests) => {
        dispatch(updatePlace({ roomRequests }))
      })
    }
  }, [query.id])


  return (
    <>
      <Head>
        <title>{ INFO?.name }</title>
        <meta
          name='description'
          content='Keep control of your guests with this simple and powerfull web app. '
        />
        <link rel='icon' href='/icon.png'></link>
      </Head>
      <UserProvider>
        <Layout>
          <Component { ...pageProps } />
        </Layout>
      </UserProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
