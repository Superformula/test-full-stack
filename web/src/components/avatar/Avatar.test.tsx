import { render } from '@testing-library/react'
import React from 'react'
import { Avatar } from './Avatar'

test('renders avatar and matches snapshot', () => {
  const { container } = render(<Avatar src="https://image.com/photo.png" alt="Test picture" />)
  expect(container).toMatchSnapshot()
})
