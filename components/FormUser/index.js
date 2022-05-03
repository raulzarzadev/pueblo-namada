import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "../../firebase/user";
import Text from "../inputs/text";

export default function FormUser() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = ({ password, email }) => {
    signIn({ email, password }).then(res => {
      console.log(res)
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text label='email' {...register('email')} />
      <Text label='password' {...register('password')} />

      <div className="mt-2 text-center">
        <Link href='/recover'>
          <a className="link-neutral">
            ¿Olvidaste tu contraseña?
          </a>
        </Link>
      </div>
      <div className=" text-center">
        {'o'}
      </div>
      <div className="text-center">
        <Link href='/signup'>
          <a className="link-accent">
            ¿No tienes una cuenta?
          </a>
        </Link>
      </div>
      <div className="flex justify-end mt-4">
        <button className="btn btn-primary">
          Ingresar
        </button>
      </div>


    </form>
  )
}