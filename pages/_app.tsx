import { useReducer, ReactNode } from 'react'
import { AppProps } from 'next/app'

import { AmplifyProvider } from '../components/AmplifyProvider'
import { userReducer } from '../models/user'

import { AppContext } from '../interfaces'

import '../styles/globals.css'

export default function UserManagementApp({
  Component,
  pageProps
}: AppProps): ReactNode {
  const initialUsers = null
  const [state, dispatch] = useReducer(userReducer, { users: initialUsers })

  return (
    <AmplifyProvider>
      <Component {...pageProps} context={{ state, dispatch } as AppContext} />
    </AmplifyProvider>
  )
}
