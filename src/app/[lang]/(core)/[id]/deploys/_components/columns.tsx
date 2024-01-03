"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { IDeploy } from '@/types/deploy';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<IDeploy>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const variants: Record<string, 'secondary' | 'outline' | 'destructive'> = {
        PROCESSING: 'secondary',
        DEPLOYED: 'outline',
        ABORTED: 'destructive',
      }
      const status: keyof typeof variants = row.getValue("status")
      const variant = variants[status]
      return (
        <Badge variant={variant}>{row.getValue("status")}</Badge>
      )
    },
  },
  {
    accessorKey: "ref",
    header: "Branch",
  },
  {
    accessorKey: "created_at",
    header: "CreatedAt",
  },
]