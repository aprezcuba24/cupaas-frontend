'use client'
import React, { createContext, useContext } from "react";
import { PropsWithChildren, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast"
import { MercureConfiguration } from '@/types/mercure-configuration';
import { useEventSource } from '../hooks/useEventSource';
import { MessageEvent } from 'event-source-polyfill';
import Link from 'next/link';

const MessageContext = createContext({
  value: '',
})

type MessageContextProviderProps = {
  configuration?: MercureConfiguration
} & PropsWithChildren

//TODO: I need to implement translation for these messages.
const ACTIONS_CONFIG = {
  DEPLOY_STARTED: {
    title: 'Ha comenzado un despliegue',
    description: (name: string) => `Desplegando el proyecto ${name}`
  },
  DEPLOY_ENDED: {
    title: 'Ha terminado un despliegue',
    description: (name: string) => `Desplegado el proyecto ${name}`
  }
}
const ACTIONS = Object.keys(ACTIONS_CONFIG)
type ActionKey = keyof typeof ACTIONS_CONFIG

export const MessageContextProvider = ({ children, configuration, ...props }: MessageContextProviderProps) => {
  const { toast } = useToast();
  const handlerMessage = useCallback((event: MessageEvent) => {
    if (ACTIONS.includes(event.data.action)) {
      const { action, data } = event.data
      console.log(action, data);
      const config = ACTIONS_CONFIG[action as ActionKey]
      toast({
        title: config.title,
        description: config.description(data.name),
        variant: 'success',
        action: (
          <ToastAction altText="deploy">
            <Link key={data.id}  href={`/${data.id}/detail`}>
              Logs
            </Link>
          </ToastAction>
        ),
      })
    }
  }, [toast]);
  useEventSource(handlerMessage, configuration)
  return (
    <MessageContext.Provider {...props} value={{
      value: 'hello',
    }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw Error('The `useMessageContext` hook must be called from a descendent of the `MessageContext`.');
  }

  return {
    value: ctx.value,
  }
}