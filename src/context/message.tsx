'use client'
import React, { createContext, useContext } from "react";
import { PropsWithChildren, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { MercureConfiguration } from '@/types/mercure-configuration';
import { useEventSource } from '../hooks/useEventSource';
import { MessageEvent } from 'event-source-polyfill';

const MessageContext = createContext({
  value: '',
})

type MessageContextProviderProps = {
  configuration?: MercureConfiguration
} & PropsWithChildren

export const MessageContextProvider = ({ children, configuration, ...props }: MessageContextProviderProps) => {
  const { toast } = useToast();
  // useEffect(() => {
  //   const time =setInterval(() => {
  //     toast({
  //       title: 'message',
  //       description: 'hello',
  //       variant: 'success',
  //     })
  //   }, 5000);
  //   return () => clearInterval(time);
  // }, [toast])
  const handlerMessage = useCallback((event: MessageEvent) => {
    console.log(event);
  }, []);
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