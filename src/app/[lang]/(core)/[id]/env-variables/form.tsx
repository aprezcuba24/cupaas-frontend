'use client'
import { Dictionary } from '@/utils/get_dictionaries';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormItems, { ItemError } from '@/components/Form/FormItems';
import { Input } from '@/components/ui/input';
import { forwardRef, useMemo, useCallback, InputHTMLAttributes, ChangeEvent, PropsWithChildren } from 'react';
import { TBranch } from '@/types/branch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TProject, ProjectSchema } from '@/types/project';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

type RowProps = {
  branches: TBranch[],
  index: string,
}

const ControlItem = ({ children, className = '' }: PropsWithChildren & { className?: string }) => (
  <div className={cn('flex flex-col', className)}>
    {children}
  </div>
)

const Row = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & RowProps>(
  ({ name: formName, value: formValue, onChange, index, branches = [] }, ref) => {
    const handlerChange = useCallback(({ target: { name, value }}: ChangeEvent<HTMLInputElement>) => {
      const event = { target: { name: formName as string, value: { ...formValue as any, [name]: value } } } as ChangeEvent<HTMLInputElement>
      onChange && onChange(event)
    }, [onChange, formName, formValue]);
    const branchName = useMemo(() => {
      const branch = branches.find(({ id }) => id === (formValue as any)?.branch)
      return branch && branch.ref
    }, [formValue, branches])
  
    return (
      <div className='flex'>
        <Input value={(formValue as any)?.name} onChange={handlerChange} className='w-1/6 mr-1' name="name" placeholder='ej CLIENT_KEY' ref={ref} required />
        <ItemError field={`${index}.name`} />
        <Input value={(formValue as any)?.value} onChange={handlerChange} name="value" className='w-4/6 mr-1' required />
        <ItemError field={`${index}.value`} />
        <ControlItem>
          <Select onChange={handlerChange} name="branch">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={branchName} />
            </SelectTrigger>
            <SelectContent>
              {branches.map(({ id, ref }) => <SelectItem key={id} value={id as string}>{ref}</SelectItem>)}
            </SelectContent>
          </Select>
          <ItemError field={`${index}.branch`} />
        </ControlItem>
      </div>
    )
  }
);
Row.displayName = 'Row'

type TProjectEnvVariables = Pick<TProject, 'env_variables'>

type FormEnvVariablesProps = {
  t: Dictionary,
  branches: TBranch[],
  action: (projectId: string, data: any) => any | boolean,
  projectId: string,
  value: TProjectEnvVariables,
}

export default function FormEnvVariables({ projectId, t, branches, action, value }: FormEnvVariablesProps) {
  const { toast } = useToast()
  const form = useForm<TProjectEnvVariables>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: value,
  })

  const handleSubmit = useCallback(async (values: any) => {
    const response = await action(projectId, values)
    if (response === true) {
      toast({
        title: t.message_toast.title_save,
        description: t.message_toast.description_save,
        variant: 'success',
      })
    } else {
      return response;
    }
  }, [projectId, action, toast, t])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="env_variables"
          render={({ field } ) => (
            <FormItem>
              <FormControl>
                <FormItems {...field} t={t} Component={Row} branches={branches}/>
              </FormControl>
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