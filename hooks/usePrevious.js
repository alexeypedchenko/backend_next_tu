import { useEffect, useRef } from 'react'

export const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return {
    previous: ref.current,
    current: value,
  }
}
