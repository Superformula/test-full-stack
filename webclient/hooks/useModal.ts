import { useState } from 'react'

export const useModal: () => {
  isOpen: boolean;
  toggleModal: () => void;
} = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleModal = (): void => setIsOpen(!isOpen)

  return {
    isOpen,
    toggleModal
  }
}
