'use client'
import { Dictionary } from '@/utils/get_dictionaries';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvVariablesSchema, TEnvVariablesSchema } from '@/types/env-variables';
import FormItems, { TRow } from '@/components/Form/FormItems';
import { Input } from '@/components/ui/input';
import { forwardRef, useMemo, useCallback, InputHTMLAttributes, ChangeEvent } from 'react';
import { Branch } from '@/types/branch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// eslint-disable-next-line react/display-name
const createRow = (branches: Branch[], t: Dictionary) => forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ name: formName, value: formValue, onChange }, ref) => {
  const handlerChange = useCallback(({ target: { name, value }}: ChangeEvent<HTMLInputElement>) => {
    const event = { target: { name: formName as string, value: { ...formValue as any, [name]: value } } } as ChangeEvent<HTMLInputElement>
    onChange && onChange(event)
  }, [onChange, formName, formValue]);
  return (
    <div className='flex'>
      <Input onChange={handlerChange} name="name" className='w-1/6 mr-1' placeholder='ej CLIENT_KEY' ref={ref} required />
      <Input onChange={handlerChange} name="value" className='w-4/6 mr-1' required />
      <Select onChange={handlerChange} name="branch">
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {branches.map(({ id, ref }) => <SelectItem key={id} value={id as string}>{ref}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}) as TRow

type FormEnvVariablesProps = {
  t: Dictionary,
  branches: Branch[],
  action: (data: any) => void,
}

export default function FormEnvVariables({ t, branches, action }: FormEnvVariablesProps) {
  const form = useForm<TEnvVariablesSchema>({
    resolver: zodResolver(EnvVariablesSchema),
    defaultValues: {
      envVariables: []
    },
  })
  const row = useMemo(() => createRow(branches, t), [branches, t])

  const handleSubmit = useCallback((values: any) => {
    console.log(values);
    // return action(values)
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="envVariables"
          render={({ field } ) => (
            <FormItem>
              <FormControl>
                <FormItems {...field} t={t} Component={row}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button type='submit'>{t.env_variable.btn_save}</Button>
        </div>
      </form>
    </Form>
  )
}