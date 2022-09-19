import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { getGuest } from '../../firebase/Gests/main'
import { CurrencySpan } from '../CurrencySpan'
import Section from '../Section'

const CashBalance = ({ cashBalance }) => {
  const { costs, accommodations } = cashBalance
  const sumarField = (arrayOfObjects, field) => {
    const aux = 0
    arrayOfObjects.map(item => aux += parseFloat(item[field] || 0))
    return aux
  }

  return (
    <div className="grid gap-4 pb-4">

      <div>
        <h2 className="font-bold ">Gastos</h2>

        <div className="flex justify-around">
          <div>
            Gastos : {costs?.length}
          </div>

          <div className="flex">
            Total : <CurrencySpan value={sumarField(costs, 'value')} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold ">Hospedajes</h2>
        <div className="flex justify-around">
          <div className="flex">
            Pagos :{accommodations.length}
          </div>
          <div className="flex">
            Total : <CurrencySpan value={sumarField(accommodations, 'mxnTotal')} />
          </div>
          <div className="text-center">
            Total noches: {sumarField(accommodations, 'nights')}
          </div>
        </div>
      </div>

      <Section title={'Gastos'} subtitle={`${costs?.length}`}>

        <table className="w-full">
          <tr>
            <th>Título</th>
            <th>Costo</th>
            <th>Fecha</th>
          </tr>
          {costs?.map(cost => <CostRow key={cost.id} cost={cost} />)}
          <tr >
            <td colSpan={2} className='text-right'>
              Gastos:
            </td>

            <td className="text-center">
              {costs?.length}
            </td>
          </tr>
          <tr >
            <td colSpan={2} className='text-right'>
              Total:
            </td>
            <td>
              <CurrencySpan value={sumarField(costs, 'value')} />
            </td>
          </tr>
        </table>
      </Section>

      <Section title={'Hospedakes'} subtitle={`${accommodations?.length || 0}`}>
        <table className="w-full">
          <tr>
            <th>Título</th>
            <th>Costo</th>
            <th>Fecha</th>
          </tr>
          <tbody>

            {accommodations?.map(accommodation => <AccommodationRow key={accommodation.id} accommodation={accommodation} />)}
            <tr>
              <td colSpan={2} className='text-right'>
                Pagos:
              </td>
              <td className="text-center">
                {accommodations.length || 0}
              </td>
            </tr>

            <tr>
              <td colSpan={2} className='text-right'>
                Noches:
              </td>

              <td className="text-center">
                {sumarField(accommodations, 'nights')}
              </td>
            </tr>

            <tr>
              <td colSpan={2} className='text-right'>
                Total:
              </td>
              <td className="text-center">
                <CurrencySpan value={sumarField(accommodations, 'mxnTotal')} />
              </td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div >
  )
}

const CostRow = ({ cost }) => {
  return (
    <tr className=" border-2 border-transparent hover:border-base-200">

      <td className="max-w-[120px]  ">
        <h4 className="truncate">
          {cost?.title}
        </h4>
      </td>

      <td>
        <CurrencySpan value={cost.value} />
      </td>

      <td>
        <div className="flex justify-center flex-col items-center text-sm text-center">
          {format(cost?.date, ' dd MMM yy HH:mm ')}
        </div>
      </td>

    </tr>

  )
}

const AccommodationRow = ({ accommodation }) => {
  const { guestId, guest, nights, dates, mxnTotal, usdTotal, discountedNights } = accommodation
  useEffect(() => {
    getGuest(guestId || guest).then(setGuestInfo)
  }, [])
  const [guestInfo, setGuestInfo] = useState()
  return (
    <tr className="border-2 border-transparent hover:border-base-200">
      <td>
        <h4>
          {guestInfo?.name}
        </h4>
        <div className="flex flex-col text-sm">

          <span>noches: {nights || 0} </span>
          <span>descuento: {discountedNights || 0} </span>
        </div>
      </td>

      <td>
        <CurrencySpan value={mxnTotal} />
      </td>

      <td className="flex justify-center">

        <div className="flex justify-center flex-col items-center mr-2">
          <span className="text-xs">Entrada</span>
          <span>
            {format(dates?.startsAt || dates.starts, 'dd MMM yy')}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center ">
          <span className="text-xs">
            Salida
          </span>
          <span>
            {format(dates?.endsAt || dates.ends, 'dd MMM yy')}
          </span>
        </div>

      </td>

    </tr>
  )
}

export default CashBalance
