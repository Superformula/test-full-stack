import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { Modal } from './Modal'

test('renders modal, triggers open and closes on Escape press', (done) => {
  const { container } = render(<Modal trigger={<button>Open</button>}>World</Modal>)

  expect(screen.queryByText(/World/i)).toBeNull() // shouldn't be rendered yet
  fireEvent.click(screen.getByText(/Open/i))
  expect(screen.queryByText(/World/i)).toBeInTheDocument() // now it's rendered

  fireEvent.keyDown(container, { code: 'Escape' })

  setTimeout(() => {
    // should be closed after animation finishes
    expect(screen.queryByText(/World/i)).toBeInTheDocument()
    done()
  }, 500)
})
