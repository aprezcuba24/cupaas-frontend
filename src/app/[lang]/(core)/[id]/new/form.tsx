'use client'
import React, { useCallback, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestResponse } from '@/utils/request';
import { Dictionary } from '@/utils/get_dictionaries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TProject as BaseTProject, ProjectSchema } from "@/types/project";
import { TBranch } from '@/types/branch';
import { InputHTMLAttributes, ChangeEvent } from 'react';
import FormItems from '@/components/Form/FormItems';

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

type TProject = Omit<BaseTProject, 'env_variables'>

type FormProps = {
  action: (values: TProject) => RequestResponse;
  t: Dictionary;
}

export default function ProjectForm({ t, action }: FormProps) {
  const form = useForm<TProject>({
    resolver: zodResolver(ProjectSchema.omit({ env_variables: true })),
    defaultValues: {
      name: "",
      git_url: "",
      branches: [
        {
          ref: 'main',
        },
      ]
    },
  })
  console.log(form.formState.errors);

  const handleSubmit = useCallback((values: TProject) => {
    return action(values)
  }, [action])

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