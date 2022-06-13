import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Text from "../inputs/text"

const FormCashCut = ({ place }) => {
  const { handleSubmit, register } = useForm()
  useEffect(() => {

  }, [])

  const onSubmit = (data) => {
    console.log(data)
    console.log(place)

  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text {...register('from')} type='date' label='Desde' />
        <Text {...register('to')} type='date' label='Hasta' />
        <button>Hacer corte</button>
      </form>
    </div >
  )
}

export default FormCashCut