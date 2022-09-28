import { googleLogin } from '@firebase/user'

const GoogleLogin = () => {
  return (
    <div className='flex mb-14  flex-col justify-center items-center'>
      <div className='card bg-base-100 shadow-lg'>
        <div className='card-body'>
          <div className='my-2'>
            <h2 className='font-bold text-2xl text-center mb-4'>
              Log in
            </h2>

            <p>Sign in with google</p>
          </div>
          <button
            className='btn btn-primary '
            onClick={ () => googleLogin() }
          >
            log in
          </button>
        </div>
      </div>
    </div>
  )
}

export default GoogleLogin
