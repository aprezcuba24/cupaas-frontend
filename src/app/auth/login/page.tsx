import { login } from '@/services/auth'
import { redirect } from 'next/navigation'


export default function Page() {
  async function create(formData: FormData) {
    'use server'
    await login(formData)
    return redirect('/dashboard')
  }
 
  return (
    <form action={create}>
      <input name="username" type="email" />
      <input name="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  )
}