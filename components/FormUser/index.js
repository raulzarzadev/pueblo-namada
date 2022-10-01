import FORM_STATUS from '@/CONSTANTS/FORM_STATUS'
import FormUserInfoGuest from 'comps/FormUserInfoGuest'
import Section from 'comps/Section'
import TextInfo from 'comps/TextInfo'
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
      },

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

      <div className='my-2 p-2 rounded-lg bg-base-300'>
        <TextInfo text='You can hide all info texts, but is not recommendable until you are familiarized with the user experience.' />
        <Toogle
          label='Hidde info texts'
          { ...register('hiddeInfoText') }
        />
      </div>
      <div className='my-2 p-2 rounded-lg bg-base-300'>
        <TextInfo text='You can create new places and recive guests' />
        <Toogle
          label='Are you a host'
          { ...register('profileType.isHost') }
        />
      </div>
      <div className='my-2 p-2 rounded-lg bg-base-300'>
        <TextInfo text='You can applay for rooms in diferents places' />
        <Toogle
          label='Are you a guest'
          { ...register('profileType.isGuest') }
        />
      </div>
      { watch('profileType.isGuest') &&
        <Section title={ 'Your guest information' } bgColor='bg-base-300'>
          <TextInfo text='This information will be seen by the administrator of the place where you request a room.' />
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
      <button disabled={ [FORM_STATUS.saving, FORM_STATUS.saved].includes(formStatus) } className='btn btn-primary m-2 mx-auto' >
        { formStatus }
      </button>
    </form>
  )
}


