import InputPassword from 'inputs/inputPassword'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Text from '../inputs/text'

export default function FormSingIn({
  submitForm = () => {},
  buttonLabel = 'Ingresar',
  errors
}) {
  const { register, handleSubmit } = useForm()
  const onSubmit = ({ password, email }) => {
    submitForm({ email, password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text label='email' {...register('email')} />
      <InputPassword
        type='password'
        label='password'
        {...register('password')}
        errors={errors}
      />

      <div className='mt-2 text-center'>
        <Link href='/recover'>
          <a className='link-neutral'>
            ¿Olvidaste tu contraseña?
          </a>
        </Link>
      </div>
      <div className=' text-center'>{'o'}</div>
      <div className='text-center'>
        <Link href='/signup'>
          <a className='link-accent'>
            ¿No tienes una cuenta?
          </a>
        </Link>
      </div>
      <div className='flex justify-end mt-4'>
        <button className='btn btn-primary'>
          {buttonLabel}
        </button>
      </div>
    </form>
  )
}
