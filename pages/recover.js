import LoginCard from '../components/LoginCard'

export default function Login() {
  return (
    <div className="p-10">
      <LoginCard formVariant="recover" label="Recuperar contraseña" />
    </div>
  )
}
