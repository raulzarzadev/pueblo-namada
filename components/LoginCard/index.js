import FormUser from "../FormUser"
import RecoverPassawordForm from "../FormUser/recover"

export default function LoginCard({ label, formVariant = 'login', formProps = {} }) {
  const formsOptions = {
    login: <FormUser {...formProps} />,
    recover: <RecoverPassawordForm {...formProps} />,
  }
  return (
    <div className="flex justify-center items-center my-10 ">
      <div className="card w-auto bg-base-100 shadow-xl p-10">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        {formsOptions[formVariant]}
      </div>
    </div>
  )
}