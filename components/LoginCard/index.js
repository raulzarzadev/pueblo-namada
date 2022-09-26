import { useUser } from 'comps/context/userContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  sendRecoverPasswordEmail,
  signIn,
  signUp
} from '../../firebase/user'
import FormSingIn from '../FormSingIn'

import RecoverPassawordForm from '../FormSingIn/recover'

export default function LoginCard({
  formVariant = 'login',
  formProps = {}
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const loginSumbit = ({ email, password }) => {
    signIn({ email, password })
      .then((res) => {
        router.push('/profile')
      })
      .catch((err) => console.error(err))
  }

  const recoverSubmit = ({ email }) => {
    setLoading(true)
    const domain = 'localhost:3000'
    sendRecoverPasswordEmail({ email, domain })
      .then((res) => {
        console.log(res)
      })
      .finally(() => setLoading(false))
  }

  const signupSubmit = ({ email, password }) => {
    signUp({ email, password }).then((res) => {
      router.push('/login')
    })
  }
  const { user } = useUser()
  useEffect(() => {
    user && router.replace('/profile')
  }, [user])

  const formsOptions = {
    login: {
      formLabel: 'Iniciar sesión',
      Component: (
        <FormSingIn
          submitForm={loginSumbit}
          {...formProps}
          buttonLabel='Ingresar'
        />
      )
    },
    recover: {
      formLabel: 'Recuperar contraseña',
      Component: (
        <RecoverPassawordForm
          submitForm={recoverSubmit}
          {...formProps}
          buttonLabel='Enviar email'
          loading={loading}
        />
      )
    },
    signup: {
      formLabel: 'Registrate',
      Component: (
        <FormSingIn
          submitForm={signupSubmit}
          {...formProps}
          buttonLabel='Registrate'
        />
      )
    }
  }

  return (
    <div className='flex justify-center items-center my-10 '>
      <div className='card w-auto bg-base-100 shadow-xl p-10'>
        <h1 className='text-3xl font-bold text-center'>
          {formsOptions[formVariant]?.formLabel}
        </h1>
        {formsOptions[formVariant]?.Component}
      </div>
    </div>
  )
}
