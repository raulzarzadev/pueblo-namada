//@ts-check

import { useEffect, useState } from "react"
import { deleteAccommodation, listenAccommodationPayments } from "../../../../firebase/accomodations"
import { formatDate } from "../../../../utils/dates"
import FormAccommodation from "../../../FormAccommodation"
import MainModal from "../../../Modal/MainModal"
import Section from "../../../Section"

const GuestPayments = ({ place, guest }) => {
  const guestId = guest.id
  const placeId = place.id
  const [payments, setPayments] = useState(undefined)
  useEffect(() => {
    listenAccommodationPayments({ placeId, guestId }, setPayments)
  }, [])

  const handleDeleteAccommodation = (id) => {
    console.log('id', id);
    deleteAccommodation(id).then(res => {
      console.log('res', res);
    })
  }


  return (
    <div>
      <h1 className="text-center font-bold mt-10">Historial de pagos</h1>
      <div className="flex justify-center">
        <MainModal title="Nuevo huesped" OpenComponentType='primary' buttonLabel="Nuevo pago">
          <FormAccommodation place={place} guest={guest} />
        </MainModal>
      </div>
      {!payments?.length && <p className="text-center" >Sin pagos aún</p >}
      {payments?.map(payment => {
        const { discountedNights, mxnTotal, usdTotal, nights, createdAt, dates, prices } = payment
        return (
          <div className="flex justify-evenly flex-col my-2 " key={payment.id}>
            <div className="text-right">
              ${parseFloat(payment?.mxnTotal).toFixed(2)}
            </div>
            <div className="sm:flex justify-between">
              <div>
                Desde:
                {dates?.starts ? formatDate(dates?.starts, "dd/MM/yy") : 'n/d'}
              </div>
              <div>
                Hasta: {dates?.ends ? formatDate(dates?.ends, "dd/MM/yy") : 'n/d'}
              </div>
            </div>
            <Section title={'Detalles'} >
              <div>
                <div className="flex justify-between">
                  <div >
                    <div>
                      <span >Noches:</span> <span className="font-bold">{nights}</span>
                    </div>
                    <div>
                      <span>Precios: </span>
                      <div>
                        Noche: <span className="font-bold">${prices?.night}</span>
                      </div>
                      <div>
                        USD: <span className="font-bold">${prices?.usd}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>
                      <span >Descuento(noches):</span> <span className="font-bold">{discountedNights || 0}</span>
                    </div>
                    <div>
                      <span >Total (mxn):</span> <span className="font-bold">${parseFloat(mxnTotal).toFixed(2)}</span>
                    </div>
                    <div>
                      <span >Total (usd):</span> <span className="font-bold">${parseFloat(usdTotal).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div>
                    Desde:
                    <span className="font-bold">
                      {formatDate(dates.starts) || 'n/d'}
                    </span>
                  </div>
                  <div>
                    Hasta:
                    <span className="font-bold">
                      {formatDate(new Date(dates?.ends), "dd/MM/yy") || 'n/d'}
                    </span>
                  </div>
                  <div>
                    Creado :
                    <span className="font-bold">
                      {formatDate(new Date(createdAt), "dd/MM/yy HH:mm") || 'n/d'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center my-4">
                  <MainModal title='Eliminar pago' buttonLabel="Eliminar" OpenComponentType='delete'>
                    <div className="flex flex-col items-center flex-center">
                      <p className="text-center">¿Seguro de que deseas eliminar este hospedaje?</p>
                      <button className="btn btn-error btn-sm m-4" onClick={() => handleDeleteAccommodation(payment.id)}>Eliminar</button>
                    </div>
                  </MainModal>
                </div>
              </div>
            </Section>
            <div className="divider" />
          </div>
        )
      })}
    </div>
  )
}

export default GuestPayments