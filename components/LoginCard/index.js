import { useRouter } from 'next/router'
import { signIn, signUp } from '../../firebase/user'
import FormSingIn from '../FormSingIn'

import RecoverPassawordForm from '../FormSingIn/recover'

export default function LoginCard({
  formVariant = 'login',
  formProps = {}
}) {
  const router = useRouter()
  const loginSumbit = ({ email, password }) => {
    signIn({ email, password })
      .then((res) => {
        router.push('/profile')
      })
      .catch((err) => console.error(err))
  }

  const recoverSubmit = ({ email }) => {
    sendRecoverPasswordEmail({ email }).then((res) => {
      console.log(res)
    })
  }

  const signupSubmit = ({ email, password }) => {
    signUp({ email, password }).then((res) => {
      router.push('/login')
    })
  }

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
