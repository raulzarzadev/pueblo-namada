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
  const [errors, setErrors] = useState({})
  const loginSumbit = ({ email, password }) => {
    signIn({ email, password })
      .then((res) => {
        router.push('/profile')
        setErrors({})
        console.log({ res })
      })
      .catch((err) => {
        console.error('login error', {
          err,
          code: err.code
        })
        if (err.code === 'auth/wrong-password')
          return setErrors({ wrongPassword: true })
        if ((err.code = 'auth/too-many-requests'))
          return setErrors({ toManyRequests: true })
      })
  }

  const recoverSubmit = ({ email }) => {
    setLoading(true)
    const domain = 'pueblonomada.com'
    sendRecoverPasswordEmail({ email, domain })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  const signupSubmit = ({ email, password }) => {
    signUp({ email, password })
      .then((res) => {
        router.push('/login')
      })
      .catch((err) => console.error(err))
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
          errors={errors}
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
          errors={errors}
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
          errors={errors}
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
