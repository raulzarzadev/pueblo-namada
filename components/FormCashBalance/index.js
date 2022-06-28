
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Text from "../inputs/text"
import { getPaymentsBettwenDates } from '../../firebase/Accommodations/main'
import { formatDate } from "../../utils/dates"
import { getPlaceCashBalanceBettweenDates } from '../../firebase/CashBalance/main'
import { async } from "@firebase/util"
import { format } from "date-fns"
const FormCashBalance = ({ place, }) => {
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      from: format(new Date(), "yyyy-MM-dd'T'00:00"),
      to: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    }
  })

  const [cashBalance, setCashBalance] = useState()

  const onSubmit = (data) => {
    // console.log('save', data)
  }

  const handleGetCashBalance = async (from, to) => {

    const balance = await getPlaceCashBalanceBettweenDates(place?.id, from, to)
    setCashBalance(balance)
    console.log(balance)

    // const payments = getPaymentsBettwenDates(place?.id, from, to, (data) => console.log(data))

    // const guest = getGuestsRegistaredBettweenDate(from, to)
    // const cost = getCostBettwenDates(from, to)
  }


  const outOfService = false
  return (
    <div>
      {cashBalance && <div>
        <h2>Gastos</h2>
        {cashBalance?.costs?.map(cost => <CostCard cost={cost} />)}
      </div>}
      <form onSubmit={handleSubmit(onSubmit)} className='relative '>
        {outOfService &&
          <h2 className="absolute top-0 w-full bottom-0 bg-slate-400 bg-opacity-60 text-white font-bold text-3xl text-center flex justify-center items-center"> Feature en desarrollo</h2>
        }
        <input type='datetime-local' {...register('from')} />
        <input type='datetime-local' {...register('to')} />
        {/*  <Text {...register('from')} label='Desde' /> */}
        {/*  <Text {...register('to')} type='date' label='Hasta' /> */}
        <div className="grid gap-2 my-4">
          <button onClick={() => handleGetCashBalance(watch('from'), watch('to'))} className="btn  btn-outline ">Hacer corte</button>
          <button disabled className="btn   ">Guardar corte</button>
        </div>
      </form>
    </div >
  )
}

const CostCard = ({ cost }) => {
  console.log(cost)
  return (
    <div>
      <h4>
        <span className="font-bold">
          {cost?.title} :
        </span>
        <span>
          {format(cost?.date, ' dd MMM yy HH:mm ')}
        </span>
      </h4>

    </div>
  )
}

export default FormCashBalance