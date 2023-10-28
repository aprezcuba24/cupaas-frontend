import { useFormState } from 'react-dom';

export type Errors = {
  errors: any;
}

const initialState: Errors = {
  errors: null,
}

export type Action = (prevState: any, form: FormData) => Promise<Response | Errors>; 

export const useServerForm = (action: Action) => {
  return useFormState(action, initialState)
}