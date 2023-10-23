'use client'
import { PropsWithChildren } from 'react'
import BaseLink, { LinkProps } from 'next/link';
import { colors } from '@mui/material'
import { useParams } from 'next/navigation'
import { styled } from "@mui/material/styles";

const LinkStyled = styled(BaseLink)`
  color: ${colors.indigo[600]};
  text-decoration: none;
  font-weight: 400;
  &:hover {
    color: ${colors.indigo[900]};
  }
`

type Props = LinkProps & PropsWithChildren

export default function Link({ children, href, ...props }: Props) {
  const { lang } = useParams()
  return (
    <LinkStyled href={`/${lang}${href}`} {...props}>{children}</LinkStyled>
  )
}