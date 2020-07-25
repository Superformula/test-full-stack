import { render } from '@testing-library/react'
import React from 'react'
import { Button } from './Button'

test('renders button', () => {
  const { container } = render(<Button type="primary">Hello World</Button>)
  expect(container).toMatchSnapshot()
})
