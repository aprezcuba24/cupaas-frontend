'use client'
import Dropdown from '@/components/Dropdowns';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { logout } from '@/services/auth';
import { Option } from '../../Dropdowns';

const SIGN_OUT = 'sign_out'

export default function UserStatus() {
  const { replace } = useRouter()
  const handleChange = useCallback(async (option: Option) => {
    if (option.value === SIGN_OUT) {
      await logout()
      return replace('/auth/login')
    }
  }, [replace])

  return (
    <Dropdown label='User name' onChange={handleChange} options={[
      {
        value: 'account_settings',
        label: 'Account settings'
      },
      {
        value: SIGN_OUT,
        label: 'Sign out'
      }
    ]} />
  )
}