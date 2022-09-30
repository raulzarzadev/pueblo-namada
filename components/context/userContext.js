import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { useRouter } from 'next/router'
import { authStateChanged } from '../../firebase/user'
import { listenUser } from '@firebase/Users'
const UserContext = createContext()

export function UserProvider ({ children }) {
  const [user, setUser] = useState(undefined)
  const router = useRouter()
  const { redirectTo } = router?.query
  useEffect(() => {
    authStateChanged((user) => {
      if (user) {
        setUser({ ...user })
        // router.replace('/profile')
      } else {
        console.error('not logged')
        setUser(null)
      }
    })
  }, [])

  if (user === undefined) return <div>loading ...</div>
  return (
    <UserContext.Provider value={ { user } }>
      { children }
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
