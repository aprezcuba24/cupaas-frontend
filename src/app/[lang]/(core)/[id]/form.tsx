'use client'
import React, { useCallback, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod';
import { TError } from '@/utils/request';
import { Dictionary } from '@/utils/get_dictionaries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TProject as BaseTProject, ProjectSchema } from "@/types/project";
import { TBranch } from '@/types/branch';
import { InputHTMLAttributes, ChangeEvent } from 'react';
import FormItems from '@/components/Form/FormItems';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

type BranchRowProps = {
  branches: TBranch[],
  index: string,
}

const BranchRow = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & BranchRowProps>(
  ({ name: formName, value: formValue, onChange, index }, ref) => {
    const handlerChange = useCallback(({ target: { name, value }}: ChangeEvent<HTMLInputElement>) => {
      const event = { target: { name: formName as string, value: { ...formValue as any, [name]: value } } } as ChangeEvent<HTMLInputElement>
      onChange && onChange(event)
    }, [onChange, formName, formValue]);

    return <Input value={(formValue as any)?.ref} onChange={handlerChange} className='w-full' name="ref" ref={ref} required />
  })
BranchRow.displayName = 'BranchRow'

export type TFormProject = Pick<BaseTProject, 'name'|'git_url'|'branches'>

type FormProps = {
  action: (values: TFormProject) => Promise<any | boolean>;
  t: Dictionary;
  value: TFormProject,
  lang: string,
}

export default function ProjectForm({ t, action, value, lang }: FormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<TFormProject>({
    resolver: zodResolver(ProjectSchema.omit({ env_variables: true })),
    defaultValues: value,
  })

  const handleSubmit = useCallback(async (values: TFormProject) => {
    const response = await action(values)
    if (response.id) {
      router.push(`/${lang}/${response.id}/detail`)
      toast({
        title: t.message_toast.title_save,
        description: t.message_toast.description_save,
        variant: 'success',
      })
    }
    return response
  }, [action, toast, t, router, lang])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.project_form.name}</FormLabel>
              <FormControl>
                <Input placeholder={t.project_form.name} {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="git_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.project_form.git_url}</FormLabel>
              <FormControl>
                <Input placeholder={t.project_form.git_url} {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branches"
          render={({ field } ) => (
            <FormItem>
              <FormLabel>{t.project_form.branches}</FormLabel>
              <FormControl>
                <FormItems {...field} t={t} Component={BranchRow}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">{t.project_form.btn}</Button>
        </div>
      </form>
    </Form>
  );
}