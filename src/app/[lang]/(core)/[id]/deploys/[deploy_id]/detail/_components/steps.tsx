'use client'
import { Dictionary } from '@/utils/get_dictionaries';
import { IDeploy } from '@/types/deploy';
import { CheckIcon, Cross1Icon, PaperPlaneIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useState, useCallback } from 'react';
import { MercureConfiguration } from '@/types/mercure-configuration';
import { useEventSource } from '@/hooks/useEventSource';
import { MessageEvent } from 'event-source-polyfill';

type StepsProps = {
  t: Dictionary,
  deploy: IDeploy,
  mercure: MercureConfiguration,
}

const StepRow = ({ value, pendingIcon }: { value: any, pendingIcon: any }) => {
  const config = {
    PENDING: {
      icon: pendingIcon,
      color: 'bg-gray-300',
      textColor: '',
    },
    STARTED: {
      icon: <PaperPlaneIcon/>,
      color: 'bg-blue-500',
      textColor: 'text-white',
    },
    ABORTED: {
      icon: <Cross1Icon/>,
      color: 'bg-red-400',
      textColor: 'text-white',
    },
    FINISHED: {
      icon: <CheckIcon/>,
      color: 'bg-green-500',
      textColor: 'text-white',
    },
  }
  const configItem = config[value.STATUS as keyof typeof config]
  const icon = configItem['icon']
  const color = configItem['color']
  const textColor = configItem['textColor']
  const size = 35
  return (
    <div className="flex mb-3">
      <div className={`rounded-full mr-1 flex justify-center items-center ${color} text-white`} style={{ height: size, width: size }}>
        {icon}
      </div>
      <div className={`w-full rounded pt-1 pl-5 ${color} ${textColor}`}>{value.LABEL}</div>
    </div>
  )
};

export default function Steps({ t, deploy, mercure }: StepsProps) {
  const [currentDeploy, setCurrentDeploy] = useState(deploy)
  const steps = Object.entries(currentDeploy.steps)
  const hasOneAborted = steps.reduce((acc, [_, value]: [any, any]) => {
    if (value["STATUS"] === 'ABORTED') {
      return true
    }
    return acc
  }, false)
  const handleMercure = useCallback((event: MessageEvent) => {
    const { data: { data } } = event;
    setCurrentDeploy(data)
  }, [])
  useEventSource(handleMercure, mercure)
  return (
    <>
      <h2 className='mb-5'>{t.deploy.steps}</h2>
      {steps.map(([key, value]) => <StepRow key={key} value={value} pendingIcon={hasOneAborted ? null : <ReloadIcon className="animate-spin" /> } />)}
    </>
  )
}