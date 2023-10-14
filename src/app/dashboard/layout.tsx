import { LogoutBtn } from '@/components/BtnLogout'

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <LogoutBtn />
      {children}
    </section>
  )
}