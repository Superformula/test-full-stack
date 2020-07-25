import React, { ReactElement } from 'react'
import { Avatar } from '../../components/avatar/Avatar'
import { Card } from '../../components/card/Card'

interface UserProps {
  name: string
  avatar: string
  description: string
}

export const UserCard = ({ name, avatar, description }: UserProps): ReactElement => (
  <Card>
    <Avatar src={avatar} alt={name} />
    <h2>{name}</h2>
    <p>{description}</p>
  </Card>
)
