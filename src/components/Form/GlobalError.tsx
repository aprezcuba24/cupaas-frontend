import { Errors } from '@/hooks/useServerForm';

const GLOBAL_ERROR_FIELD = 'non_field_errors'

export default function GlobalError({ errors }: Errors) {
  const globalError = errors && errors[GLOBAL_ERROR_FIELD]
  return !!globalError && globalError.map((item: string) => <p className='text-red-500' key={item}>{item}</p>)
}