import '@/app/[lang]/globals.css'
import { Suspense } from 'react'
import Nav from '@/components/layout/Nav'

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense>
      <div className="min-h-full">
        <Nav/>
        <main className='h-screen max-h-min'>
          <div className="h-full mx-auto max-w-7xl py-6 px-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </Suspense>
  )
}