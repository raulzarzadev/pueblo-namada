import Link from "next/link";
import { useForm } from "react-hook-form";
import { sendRecoverPasswordEmail, signIn } from "../../firebase/user";
import Text from "../inputs/text";

export default function RecoverPassawordForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = ({ password, email }) => {
    sendRecoverPasswordEmail({ email }).then(res => {
      console.log(res)
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text label='email' {...register('email')} />

      <div className="mt-2 text-center">
        <Link href='/login'>
          <a className="link-neutral">
            Ingresar
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
          Recuperar
        </button>
      </div>


    </form>
  )
}