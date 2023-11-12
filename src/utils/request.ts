import { cookies } from 'next/headers';

export type TError = Promise<{ errors: any }>

export const request = async (method: string, path: string, data: any = null, options: RequestInit = {}) => {
  const API_URL = process.env.API_URL
  data = data instanceof FormData ? Object.fromEntries(data) : data
  let defaultHeaders: any = {
    "Content-Type": "application/json",
  }
  const token = cookies().get('token')
  if (token) {
    defaultHeaders = { ...defaultHeaders, Authorization: `Token ${token.value}`}
  }
  options = {
    method,
    headers: {
      ...defaultHeaders,
      ...options.headers || {},
    },
    ...options
  }
  if (data) {
    options.body = JSON.stringify(data)
  }
  if (method !== 'GET') {
    options.cache = 'no-store'
  }
  const response = await fetch(`${API_URL}${path}`, options)
  if (response.ok) {
    return response
  }
  return {
    errors: await response.json()
  } as unknown as TError
}

export type RequestResponse = TError | Promise<Response>;