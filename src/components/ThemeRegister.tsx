'use client'
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from '@/utils/theme'

export default function ThemeRegister({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={Theme}>
      {children}
    </ThemeProvider>
  )
}