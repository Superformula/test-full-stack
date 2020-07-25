import { render } from '@testing-library/react'
import React from 'react'
import { Card } from './Card'

test('renders card and matches snapshot', () => {
  const { container } = render(<Card>Hello World</Card>)
  expect(container).toMatchSnapshot()
})
