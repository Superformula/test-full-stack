import { AppProps } from 'next/app'
import { useReducer, ReactNode } from 'react'

import { AmplifyProvider } from '../amplify/AmplifyProvider'
import { userReducer } from '../models/user'

import { AppContext } from '../interfaces'

import '../styles/globals.css'

export default function UserManagementApp({
  Component,
  pageProps
}: AppProps): ReactNode {
  const initialUsers = []
  const [state, dispatch] = useReducer(userReducer, { users: initialUsers })

  return (
    <AmplifyProvider>
      <Component {...pageProps} context={{ state, dispatch } as AppContext} />
    </AmplifyProvider>
  )
}
