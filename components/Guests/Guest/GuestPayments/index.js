import { useEffect, useState } from 'react'
import {
  deleteAccommodation,
  listenAccommodationPayments
} from '../../../../firebase/accomodations'
import { Dates } from '../../../../firebase/Dates.utils'
import FormAccommodation from '../../../FormAccommodation'
import MainModal from '../../../Modal/MainModal'
import Section from '../../../Section'

const GuestPayments = ({ place, guest }) => {
  const guestId = guest.id
  const placeId = place.id
  const [payments, setPayments] = useState(undefined)

  useEffect(() => {
    listenAccommodationPayments({ placeId, guestId }, setPayments)
  }, [])

  return (
    <div>
      <h1 className="text-center font-bold mt-10">Historial de pagos</h1>
      <div className="flex justify-center">
        <MainModal
          title={`Nuevo pago de ${guest?.name}`}
          OpenComponentType="primary"
          buttonLabel="Nuevo pago">
          <h1 className="text-xl ">{guest?.name}</h1>
          <FormAccommodation place={place} guest={guest} />
        </MainModal>
      </div>
      {!payments?.length && <p className="text-center">Sin pagos aún</p>}

      {payments?.map((payment) => (
        <Section
          key={payment?.id}
          title={`$${parseFloat(payment.mxnTotal).toFixed(2)}`}
          subtitle={`${Dates.format(payment?.dates?.startsAt)} - ${Dates.format(
            payment?.dates?.endsAt
          )}`}>
          <PaymentDetails payment={payment} key={payment.id} place={place} />
        </Section>
      ))}
    </div>
  )
}

export const PaymentDetails = ({ payment, place }) => {
  const handleDeleteAccommodation = (id) => {
    deleteAccommodation(id).then((res) => {
      console.log('res', res)
    })
  }

  const {
    discountedNights,
    mxnTotal,
    usdTotal,
    nights,
    createdAt,
    dates,
    prices,
    accommodationStarts
  } = payment

  return (
    <>
      <div>
        <div>
          <div className="flex justify-between text-right mb-4">
            <div>
              <div>
                <span>Precios </span>
                <div>
                  Noche: <span className="font-bold">${prices?.night}</span>
                </div>
                <div>
                  USD: <span className="font-bold">${prices?.usd}</span>
                </div>
              </div>
            </div>
            <div>
              <span>Fechas </span>
              <div>
                Desde:
                <span className="font-bold">
                  {dates &&
                    Dates.format(dates?.startsAt || dates?.starts, 'dd MMM yy')}
                </span>
              </div>
              <div>
                Hasta:
                <span className="font-bold">
                  {dates &&
                    Dates.format(dates?.endsAt || dates?.ends, 'dd MMM yy')}
                </span>
              </div>
              <div>
                Creado :
                <span className="font-bold">
                  {(createdAt &&
                    Dates.format(new Date(createdAt), 'dd/MM/yy HH:mm')) ||
                    'n/d'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div>
              <span>Noches:</span> <span className="font-bold">{nights}</span>
            </div>
            <div>
              <span>Descuento(noches):</span>{' '}
              <span className="font-bold">{discountedNights || 0}</span>
            </div>
            <div>
              <span>Total (mxn):</span>{' '}
              <span className="font-bold">
                ${parseFloat(mxnTotal).toFixed(2)}
              </span>
            </div>
            <div>
              <span>Total (usd):</span>{' '}
              <span className="font-bold">
                ${parseFloat(usdTotal).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center my-4">
          <MainModal
            title={'Editar pago'}
            buttonLabel="Editar"
            OpenComponentType="info">
            <FormAccommodation
              place={place}
              guest={payment.guest}
              payment={payment}
            />
          </MainModal>
          <MainModal
            title="Eliminar pago"
            buttonLabel="Eliminar"
            OpenComponentType="delete">
            <div className="flex flex-col items-center flex-center">
              <p className="text-center">
                ¿Seguro de que deseas eliminar este hospedaje?
              </p>
              <button
                className="btn btn-error btn-sm m-4"
                onClick={() => handleDeleteAccommodation(payment.id)}>
                Eliminar
              </button>
            </div>
          </MainModal>
        </div>
      </div>
    </>
  )
}

export default GuestPayments
