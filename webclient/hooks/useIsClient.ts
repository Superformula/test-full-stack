import { useState, useEffect, SetStateAction, Dispatch } from 'react'

export const useIsClient: () => readonly [
  boolean,
  Dispatch<SetStateAction<boolean>>
] = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [setIsClient])

  return [isClient, setIsClient] as const
}
