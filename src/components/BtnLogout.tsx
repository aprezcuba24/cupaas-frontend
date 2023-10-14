'use client'
import { useCallback } from 'react'
import { logout } from '@/services/auth';
import { useRouter } from 'next/navigation'

export const LogoutBtn = () =>  {
  const { replace } = useRouter()
  const handleLogout = useCallback(async () => {
    await logout()
    return replace('/auth/login')
  }, [replace])
  return <button onClick={handleLogout}>Logout</button>
}
