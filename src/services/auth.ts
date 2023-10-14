'use server'

import { request } from '@/utils/request'
import { cookies } from 'next/headers'

export const login = async (formData: FormData) => {
  const response = await request('POST', '/auth-token/', formData)
  const { token } = await response.json();
  cookies().set('token', token)
}

export const isAuthenticated  = async () => {
  return !!cookies().get('token')
}

export const logout = async () => {
  return cookies().delete('token')
}
