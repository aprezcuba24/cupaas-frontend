import { useEffect } from 'react';
import { EventSourcePolyfill, MessageEvent } from 'event-source-polyfill';
import { MercureConfiguration } from '@/types/mercure-configuration';

export const useEventSource = (callback: (event: MessageEvent) => void, configuration?: MercureConfiguration) => {
  useEffect(() => {
    if (!configuration) {
      return;
    }
    const hubUrl = configuration.hubUrl;
    const topics = configuration.topics;
    const token = configuration.token;
    if (!configuration.topics) {
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
  }, [callback, configuration]);
};
