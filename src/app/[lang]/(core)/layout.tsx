import '@/app/[lang]/globals.css'
import { Suspense } from 'react'
import Nav from '@/components/layout/Nav'
import { getDictionary } from '@/utils/get_dictionaries';
import { PageParams } from '@/utils/types';

export default async function DashboardLayout({
  children, // will be a page or nested layout
  params: { lang }
}: {
  children: React.ReactNode
} & PageParams) {
  const t = await getDictionary(lang)
  return (
    <Suspense>
      <div className="min-h-full">
        <Nav t={t} />
        <main>
          <div className="mx-auto max-w-7xl py-6 px-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </Suspense>
  )
}