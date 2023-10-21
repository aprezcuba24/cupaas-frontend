export const request = async (method: string, path: string, data: any = null) => {
  const API_URL = process.env.API_URL
  data = data instanceof FormData ? Object.fromEntries(data) : data
  const response = await fetch(`${API_URL}${path}`, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.ok) {
    return response
  }
  return {
    errors: await response.json()
  }
}