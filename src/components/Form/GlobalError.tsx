import { Errors } from '@/hooks/useServerForm';
import { FormHelperText as BaseFormHelperText } from '@mui/material';
import { styled } from "@mui/material/styles";

const FormHelperText = styled(BaseFormHelperText)`
  color: red;
`

const GLOBAL_ERROR_FIELD = 'non_field_errors'

export default function GlobalError({ errors }: Errors) {
  const globalError = errors && errors[GLOBAL_ERROR_FIELD]
  return !!globalError && globalError.map((item: string) => <FormHelperText key={item}>{item}</FormHelperText>)
}