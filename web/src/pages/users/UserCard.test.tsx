import { render } from '@testing-library/react'
import React from 'react'
import { UserCard } from './UserCard'

test('renders avatar and matches snapshot', () => {
  const { container } = render(
    <UserCard avatar="https://image.com/photo.png" name="Test picture" description="Picture works" />,
  )
  expect(container).toMatchSnapshot()
})
