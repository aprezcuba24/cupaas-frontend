'use client'
import { Dictionary } from '@/utils/get_dictionaries';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvVariablesSchema, TEnvVariablesSchema } from '@/types/env-variables';
import FormItems, { TRow } from '@/components/Form/FormItems';
import { Input } from '@/components/ui/input';
import { forwardRef, useMemo, useCallback, InputHTMLAttributes, ChangeEvent } from 'react';
import { TBranch } from '@/types/branch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// eslint-disable-next-line react/display-name
const createRow = (branches: TBranch[], t: Dictionary) => forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ name: formName, value: formValue, onChange }, ref) => {
  const handlerChange = useCallback(({ target: { name, value }}: ChangeEvent<HTMLInputElement>) => {
    const event = { target: { name: formName as string, value: { ...formValue as any, [name]: value } } } as ChangeEvent<HTMLInputElement>
    onChange && onChange(event)
  }, [onChange, formName, formValue]);
  const branchName = useMemo(() => {
    const branch = branches.find(({ id }) => id === (formValue as any)?.branch)
    return branch && branch.ref
  }, [formValue])

  return (
    <div className='flex'>
      <Input value={(formValue as any)?.name} onChange={handlerChange} name="name" className='w-1/6 mr-1' placeholder='ej CLIENT_KEY' ref={ref} required />
      <Input value={(formValue as any)?.value} onChange={handlerChange} name="value" className='w-4/6 mr-1' required />
      <Select onChange={handlerChange} name="branch">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={branchName} />
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
  branches: TBranch[],
  action: (projectId: string, data: any) => void,
  projectId: string,
  value: TEnvVariablesSchema[],
}

export default function FormEnvVariables({ projectId, t, branches, action, value }: FormEnvVariablesProps) {
  const form = useForm<TEnvVariablesSchema>({
    resolver: zodResolver(EnvVariablesSchema),
    defaultValues: {
      env_variables: value,
    },
  })
  const row = useMemo(() => createRow(branches, t), [branches, t])

  const handleSubmit = useCallback((values: any) => {
    return action(projectId, values)
  }, [projectId, action])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="env_variables"
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