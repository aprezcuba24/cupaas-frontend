'use client'
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestResponse } from '@/utils/request';
import { Dictionary } from '@/utils/get_dictionaries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Branches from "./branches";
import { TProject, ProjectSchema } from "@/types/project";

type FormProps = {
  action: (values: TProject) => RequestResponse;
  t: Dictionary;
}

export default function ProjectForm({ t, action }: FormProps) {
  const form = useForm<TProject>({
    resolver: zodResolver(ProjectSchema),
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
                <Branches {...field} t={t}/>
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