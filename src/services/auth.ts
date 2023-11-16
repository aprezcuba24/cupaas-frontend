'use server'
import { request } from '@/utils/request'
import { cookies } from 'next/headers'
import { TUser } from '@/types/user';

export const login = async (formData: FormData) => {
  const response = await request('POST', '/auth-token/', formData)
  if (response instanceof Response) {
    const { token } = await response.json();
    cookies().set('token', token)
  }
  return response
}

export const isAuthenticated  = async () => {
  return !!cookies().get('token')
}

export const logout = async () => {
  return cookies().delete('token')
}

export const createAccount = async (formData: FormData) => {
  return request('POST', '/api/users/', formData)
}

export const changePassword = async (formData: FormData, token: string) => {
  return request('POST', '/api/users/change-password/', formData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

export const sendEmailRecover = (formData: FormData) => {
  return request('POST', '/api/users/send-recover-password/', formData)
}

export const getCurrentUser = async (): Promise<TUser> => {
  return (await request('GET', '/api/users/me') as Response).json()
}
