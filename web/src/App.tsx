import React from 'react'
import { IntlProvider } from 'react-intl'
import style from './App.module.scss'
import { i18n } from './i18n'
import { UsersPage } from './pages/users/UsersPage'

function App() {
  return (
    <IntlProvider locale={i18n.locale} messages={i18n.messages}>
      <header className={style.AppHeader}>
        <UsersPage />
      </header>
    </IntlProvider>
  )
}

export default App
