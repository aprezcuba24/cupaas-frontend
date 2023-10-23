import { FormControl as BaseFormControl, FormControlProps, FormHelperText } from '@mui/material';
import { styled } from "@mui/material/styles";

const FormRow = styled(BaseFormControl)`
  display: flex;
  &>p{
    margin-left: 0;
  }
`

type Props = {
  error: string[],
}

export default function FormControl({children, error, ...props}: Props & FormControlProps) {
  return <FormRow error={!!error} {...props}>
    {children}
    {!!error && error.map((item) => <FormHelperText key={item}>{item}</FormHelperText>)}
  </FormRow>
}