import { render } from '@testing-library/react'
import React from 'react'
import { Input } from './Input'

test('renders input and matches snapshot', () => {
  const { container } = render(<Input placeholder="Hello World" />)
  expect(container).toMatchSnapshot()
})

test('renders input with value and matches snapshot', () => {
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {}
  const { container, getByText } = render(<Input placeholder="Hello" value="World" onChange={onChange} />)
  const placeholderElement = getByText(/Hello/i)
  expect(container).toMatchSnapshot()
  expect(placeholderElement).toBeInTheDocument()
})
