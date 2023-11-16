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
import { TUser } from '@/types/user';
import { Keys, Dictionary } from '@/utils/get_dictionaries';

const SIGN_OUT = 'sign_out'
const SETTINGS = 'setting'

type UserStatusProps = {
  user: TUser
  lang: Keys
  t: Dictionary
}

export default function UserStatus({ user, lang, t }: UserStatusProps) {
  const { replace } = useRouter()
  const handleChange = useCallback(async (option: string) => {
    if (option === SIGN_OUT) {
      await logout()
      return replace('/auth/login')
    }
    if (option === SETTINGS) {
      return replace(`/${lang}/user`)
    }
  }, [replace, lang])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">{user.email}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t.user_menu.my_account_title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleChange(SETTINGS)}>
            {t.user_menu.user_settings}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleChange(SIGN_OUT)}>
          {t.user_menu.logout}
          <DropdownMenuShortcut>
            <ArrowRightIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}