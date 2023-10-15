import { redirect } from 'next/navigation'

export default function Page() {
  async function create(formData: FormData) {
    'use server'
    console.log(
      Object.fromEntries(formData)
    );
    await fetch('/products')
    return redirect('/auth/login')
  }
 
  return (
    <form action={create}>
      <input name="name" type="text" />
      <button type="submit">Submit</button>
    </form>
  )
}