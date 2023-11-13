'use client'
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { logout } from '@/services/auth';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from "@radix-ui/react-icons"

const SIGN_OUT = 'sign_out'

export default function UserStatus() {
  const { replace } = useRouter()
  const handleChange = useCallback(async (option: string) => {
    console.log(option);
    if (option === SIGN_OUT) {
      await logout()
      return replace('/auth/login')
    }
  }, [replace])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">User name</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Account settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleChange(SIGN_OUT)}>
          Log out
          <DropdownMenuShortcut>
            <ArrowRightIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}