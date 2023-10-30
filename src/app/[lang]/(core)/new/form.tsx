'use client'
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestResponse } from '@/utils/request';
import { Dictionary } from '@/utils/get_dictionaries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Branches from "./branches";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  git_url: z.string().url(),
  branches: z.any().array(),
})

type FormProps = {
  action: (formData: FormData) => RequestResponse;
  t: Dictionary;
}

export default function ProjectForm({ t, action }: FormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      git_url: "",
      branches: [
        {
          name: 'main',
        },
      ]
    },
  })

  return (
    <Form {...form}>
      <form action={action} className="space-y-8">
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
        <Button type="submit">{t.project_form.btn}</Button>
      </form>
    </Form>
  );
}