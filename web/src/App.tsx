import React from 'react'
import { Card } from './components/card/Card'

import style from './App.module.scss'

function App() {
  return (
    <div className={style.App}>
      <header className={style.AppHeader}>
        <Card>Hello World</Card>
      </header>
    </div>
  )
}

export default App
