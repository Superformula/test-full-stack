import React from 'react'
import { Avatar } from './components/avatar/Avatar'
import { Card } from './components/card/Card'

import style from './App.module.scss'

function App() {
  return (
    <header className={style.AppHeader}>
      <Card>
        <Avatar src="https://source.unsplash.com/400x400/?people" alt="Hello World" />
        <h2>JESSICA MAY</h2>
        <p>Lorem ipsum dolor sit amet</p>
      </Card>
    </header>
  )
}

export default App
