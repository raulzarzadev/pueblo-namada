import FORM_STATUS from '@/CONSTANTS/FORM_STATUS'
import FormUserInfoGuest from 'comps/FormUserInfoGuest'
import Section from 'comps/Section'
import Link from 'next/link'
import { useState } from 'react'
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
    setValue,
    formState: { errors }
  } = useForm({
    // Format guestProfile wiht the user name
    defaultValues: {
      ...user,
      guestProfile: {
        ...user.guestProfile,
        name: user.name
      }
    }
  })
  const onSubmit = ({ ...form }) => {
    submitForm({ ...form })
  }

  const [formStatus, setFormStatus] = useState(FORM_STATUS.save)
  const handleSetFormStatus = (newStatus) => {
    setFormStatus(newStatus)
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
            onChangeFormStatus={ handleSetFormStatus }
            register={ register }
            setValue={ setValue }
            watch={ watch }
          />
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
      <button className='btn btn-primary m-2 mx-auto' >
        { formStatus }
      </button>
    </form>
  )
}


