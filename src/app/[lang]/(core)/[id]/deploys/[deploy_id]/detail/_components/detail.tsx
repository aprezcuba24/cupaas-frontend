'use client'
import { Dictionary } from '@/utils/get_dictionaries';
import { IDeploy } from '@/types/deploy';
import { MercureConfiguration } from '@/types/mercure-configuration';
import { Row } from '@/components/Row';
import VariantBadge from '../../../_components/variant-badge';
import Steps from './steps';
import { useState, useCallback } from 'react';
import { useEventSource } from '@/hooks/useEventSource';
import { MessageEvent } from 'event-source-polyfill';

type DetailProps = {
  t: Dictionary
  deploy: IDeploy
  mercure: MercureConfiguration,
}

export default function Detail({ t, deploy, mercure }: DetailProps) {
  const [currentDeploy, setCurrentDeploy] = useState(deploy)
  const handleMercure = useCallback((event: MessageEvent) => {
    const { data: { data } } = event;
    setCurrentDeploy(data)
  }, [])
  useEventSource(handleMercure, mercure)

  return (
    <div className='pb-5'>
      <h2 className='mb-5'>{t.deploy.title_single}</h2>
      <Row label={t.deploy.status}>
        <VariantBadge>{currentDeploy.status}</VariantBadge>
      </Row>
      <Row label={t.deploy.branch}>{currentDeploy.ref}</Row>
      <Row label={t.deploy.date}>{currentDeploy.created_at.toString()}</Row>
      <Row label={t.deploy.commit}>{currentDeploy.commit_message}</Row>
      <Steps t={t} deploy={currentDeploy} mercure={mercure} />
    </div>
  )
}