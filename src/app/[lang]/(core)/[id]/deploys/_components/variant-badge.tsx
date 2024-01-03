import { Badge } from '@/components/ui/badge';

export default function  VariantBadge({ children }: { children: string  }) {
  const variants: Record<string, 'secondary' | 'outline' | 'destructive'> = {
    PROCESSING: 'secondary',
    DEPLOYED: 'outline',
    ABORTED: 'destructive',
  }
  const status: keyof typeof variants = children
  const variant = variants[status]

  return (
    <Badge variant={variant}>{children}</Badge>
  )
}