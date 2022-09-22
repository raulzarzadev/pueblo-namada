import { Dates } from 'firebase-dates-util'
import { deleteAccommodation } from '../../firebase/Accommodations/main'
import FormAccommodation from '../FormAccommodation'
import MainModal from '../Modal/MainModal'

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
          <div className='flex justify-between text-right mb-4'>
            <div>
              <div>
                <span>Precios </span>
                <div>
                  Noche:{' '}
                  <span className='font-bold'>
                    ${prices?.night}
                  </span>
                </div>
                <div>
                  USD:{' '}
                  <span className='font-bold'>
                    ${prices?.usd}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span>Fechas </span>
              <div>
                Desde:
                <span className='font-bold'>
                  {dates &&
                    Dates.format(
                      dates?.startsAt || dates?.starts,
                      'dd MMM yy'
                    )}
                </span>
              </div>
              <div>
                Hasta:
                <span className='font-bold'>
                  {dates &&
                    Dates.format(
                      dates?.endsAt || dates?.ends,
                      'dd MMM yy'
                    )}
                </span>
              </div>
              <div>
                Creado :
                <span className='font-bold'>
                  {(createdAt &&
                    Dates.format(
                      new Date(createdAt),
                      'dd/MM/yy HH:mm'
                    )) ||
                    'n/d'}
                </span>
              </div>
            </div>
          </div>

          <div className='text-right'>
            <div>
              <span>Noches:</span>{' '}
              <span className='font-bold'>{nights}</span>
            </div>
            <div>
              <span>Descuento(noches):</span>{' '}
              <span className='font-bold'>
                {discountedNights || 0}
              </span>
            </div>
            <div>
              <span>Total (mxn):</span>{' '}
              <span className='font-bold'>
                ${parseFloat(mxnTotal).toFixed(2)}
              </span>
            </div>
            <div>
              <span>Total (usd):</span>{' '}
              <span className='font-bold'>
                ${parseFloat(usdTotal).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className='flex justify-center my-4'>
          <MainModal
            title={'Editar pago'}
            buttonLabel='Editar'
            OpenComponentType='info'
          >
            <FormAccommodation
              place={place}
              guest={payment.guest}
              payment={payment}
            />
          </MainModal>
          <MainModal
            title='Eliminar pago'
            buttonLabel='Eliminar'
            OpenComponentType='delete'
          >
            <div className='flex flex-col items-center flex-center'>
              <p className='text-center'>
                ¿Seguro de que deseas eliminar este
                hospedaje?
              </p>
              <button
                className='btn btn-error btn-sm m-4'
                onClick={() =>
                  handleDeleteAccommodation(payment.id)
                }
              >
                Eliminar
              </button>
            </div>
          </MainModal>
        </div>
      </div>
    </>
  )
}
