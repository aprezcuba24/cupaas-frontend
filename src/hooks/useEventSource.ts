import { useEffect } from 'react';
import { EventSourcePolyfill, MessageEvent } from 'event-source-polyfill';
import { MercureConfiguration } from '@/types/mercure-configuration';

export const useEventSource = (callback: (event: MessageEvent) => void, configuration?: MercureConfiguration) => {
  const { hubUrl, topics, token } = configuration || {};
  useEffect(() => {
    if (!hubUrl || !token || !topics) {
      return;
    }
    const url = new URL(hubUrl);
    topics.forEach(element => {
      url.searchParams.append('topic', element);
    });
    const eventSource = new EventSourcePolyfill(url as unknown as string, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    eventSource.onmessage = event => {
      event.data = JSON.parse(event.data)
      callback(event)
    };

    return () => eventSource.close();
  }, [callback, hubUrl, topics, token]);
};
