import { Box as BaseBox, Typography, styled } from '@mui/material';
import { getDictionary } from '@/utils/get_dictionaries';
import { PageParams } from '@/utils/types';
import Content from './content';

export default async function Page({ params: { lang } }: PageParams) {
  const t = await getDictionary(lang)
  return <Content t={t} lang={lang}/>
}