import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getPlaceCashBalanceBettweenDates } from '../../firebase/CashBalance/main'
import { format } from 'date-fns'
import CashBalance from '../CashBalance'

const FormCashBalance = ({ place }) => {
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      from: format(new Date(), "yyyy-MM-dd'T'00:00"),
      to: format(new Date(), "yyyy-MM-dd'T'HH:mm")
    }
  })

  const [cashBalance, setCashBalance] = useState()

  const onSubmit = (data) => {
    // console.log('save', data)
  }

  const handleGetCashBalance = async (from, to) => {
    getPlaceCashBalanceBettweenDates(place?.id, from, to)
      .then(setCashBalance)
      .catch((err) => console.error(err))
  }

  const outOfService = false

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="relative ">
        {outOfService && (
          <h2 className="absolute top-0 w-full bottom-0 bg-slate-400 bg-opacity-60 text-white font-bold text-3xl text-center flex justify-center items-center">
            {' '}
            Feature en desarrollo
          </h2>
        )}

        <div className="flex justify-end my-2">
          <label>
            Desde:
            <input
              className="input input-sm input-bordered"
              type="datetime-local"
              {...register('from')}
            />
          </label>
        </div>

        <div className="flex justify-end my-2">
          <label>
            Hasta:
            <input
              className="input input-sm input-bordered"
              type="datetime-local"
              {...register('to')}
            />
          </label>
        </div>
        {/*  <Text {...register('from')} label='Desde' /> */}
        {/*  <Text {...register('to')} type='date' label='Hasta' /> */}
        <div className="grid gap-2 my-4">
          <button
            onClick={() => handleGetCashBalance(watch('from'), watch('to'))}
            className="btn  btn-outline "
          >
            Hacer corte
          </button>
          <button disabled className="btn   ">
            Guardar corte
          </button>
        </div>
      </form>
      {cashBalance && <CashBalance cashBalance={cashBalance} />}
    </div>
  )
}

export default FormCashBalance
