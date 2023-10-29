import { cookies } from 'next/headers';

export const request = async (method: string, path: string, data: any = null, headers = {}) => {
  const API_URL = process.env.API_URL
  data = data instanceof FormData ? Object.fromEntries(data) : data
  let defaultHeaders: any = {
    "Content-Type": "application/json",
  }
  const token = cookies().get('token')
  if (token) {
    defaultHeaders = { ...defaultHeaders, Authorization: `Token ${token.value}`}
  }
  const options: RequestInit = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
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
  }
}