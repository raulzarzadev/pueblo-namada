import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Text from '../inputs/text'
import Toogle from '../inputs/toogle'

export default function FormUser ({ user, submitForm = () => { } }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: { ...user }
  })
  const onSubmit = ({ ...form }) => {
    submitForm({ ...form })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text label="email" {...register('email')} />
      <Text label="name" {...register('name')} />
      <Toogle label="Are you a host" {...register('profileType.isHost')} />
      <button className="btn btn-primary m-2 mx-auto">Editar</button>
    </form>
  )
}
