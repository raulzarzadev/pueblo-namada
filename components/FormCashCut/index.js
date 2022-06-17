
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Text from "../inputs/text"
import { getPaymentsBettwenDates } from '../../firebase/Accommodations/main'
import { formatDate } from "../../utils/dates"

const FormCashCut = ({ place }) => {
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      from: formatDate(new Date(), "yyyy-MM-dd"),
      to: formatDate(new Date(), "yyyy-MM-dd"),
    }
  })

  const onSubmit = (data) => {
    console.log('save', data)
  }

  const handleGetCashcut = (from, to) => {
    const payments = getPaymentsBettwenDates(place?.id, from, to, (data) => console.log(data))

    // const guest = getGuestsRegistaredBettweenDate(from, to)
    // const cost = getCostBettwenDates(from, to)
  }



  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='relative '>
        <h2 className="absolute top-0 w-full bottom-0 bg-slate-400 bg-opacity-60 text-white font-bold text-3xl text-center flex justify-center items-center"> Feature en desarrollo</h2>
        <Text {...register('from')} disabled type='date' label='Desde' />
        <Text {...register('to')} disabled type='date' label='Hasta' />
        <div className="grid gap-2 my-4">
          <button disabled onClick={() => handleGetCashcut(watch('from'), watch('to'))} className="btn  btn-outline ">Hacer corte</button>
          <button disabled className="btn   ">Guardar corte</button>
        </div>
      </form>
    </div >
  )
}

export default FormCashCut