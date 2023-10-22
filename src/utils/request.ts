export const request = async (method: string, path: string, data: any = null, headers = {}) => {
  const API_URL = process.env.API_URL
  data = data instanceof FormData ? Object.fromEntries(data) : data
  const options: RequestInit = {
    method,
    body: JSON.stringify(data),
    headers: {
      ...{
        "Content-Type": "application/json",
      },
      ...headers,
    },
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