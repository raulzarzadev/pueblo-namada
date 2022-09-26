import { useUser } from '@comps/context/userContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

type PermissionTo = 'admin' | 'private' | 'public' | 'owner'

const PrivatePage = ({
  children,
  permissionTo = 'private',
  elementOwner = null
}: {
  children?: ReactNode
  permissionTo: PermissionTo
  elementOwner?: string | null
}): ReactNode => {
  const { user } = useUser()

  const AUTH_PAGES = {
    public: () => <>{children}</>,
    private: () =>
      user ? (
        <>{children}</>
      ) : (
        <NoUserPage permissionTo={permissionTo} />
      ),
    admin: () =>
      user?.admin ? (
        <>{children}</>
      ) : (
        <NoUserPage permissionTo={permissionTo} />
      ),
    owner: ({
      elementOwner
    }: {
      elementOwner: string | null
    }) =>
      user?.id === elementOwner ? (
        <>{children}</>
      ) : (
        <NoUserPage permissionTo={permissionTo} />
      )
  }
  const Component = AUTH_PAGES[
    permissionTo
  ]

  return <Component elementOwner={elementOwner} />
}

const NoUserPage = ({
  permissionTo
}: {
  permissionTo: PermissionTo
}) => {
  const { back } = useRouter()
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <h1 className='text-3xl '>No tienes autorización</h1>
      <p>({permissionTo})</p>
      <div className='flex  w-full justify-evenly '>
        <button
          className='btn btn-outline'
          onClick={() => back()}
        >
          Regresa
        </button>
        <Link href={'/login'}>
          <button className='btn btn-primary'>
            Inicia sesión
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PrivatePage
