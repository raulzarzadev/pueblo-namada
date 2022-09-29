import FormUserInfoGuest from 'comps/FormUserInfoGuest'
import Section from 'comps/Section'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Text from '../inputs/text'
import Toogle from '../inputs/toogle'

export default function FormUser ({
  user,
  submitForm = () => { }
}) {
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
    <form onSubmit={ handleSubmit(onSubmit) }>
      <Text label='email' { ...register('email') } />
      <Text label='name' { ...register('name') } />
      <Toogle
        label='Are you a host'
        { ...register('profileType.isHost') }
      />
      <Toogle
        label='Are you a guest'
        { ...register('profileType.isGuest') }
      />
      { watch('profileType.isGuest') &&
        <Section title={ 'Your guest information' } bgColor='bg-base-300'>
          <FormUserInfoGuest
            guest={ { ...user.guestProfile, name: user.name, email: user.email } } />
        </Section>
      }
      {/* { watch('profileType.isGuest') && (
        <div>
          <h4>Guest profile</h4>
          <Text
            label='Plates'
            { ...register('guestProfile.plates') }
          />
          <Text
            label='Phone Number'
            { ...register('guestProfile.phone') }
          />
        </div>
      ) } */}
      <button className='btn btn-primary m-2 mx-auto'>
        Editar
      </button>
    </form>
  )
}


