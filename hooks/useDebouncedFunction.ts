import { useEffect } from 'react'

export const useDebouncedFunction = (
  handler: () => void,
  watchedValue: unknown,
  delay = 1000
): void => {
  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      handler()
    }, delay)

    return (): void => {
      clearTimeout(timeoutHandler)
    }
  }, [handler, watchedValue, delay])
}
