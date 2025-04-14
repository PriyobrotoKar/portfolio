import { useEffect, useState } from 'react'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}
