"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { IDeploy } from '@/types/deploy';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import VariantBadge from "./variant-badge";
import Link from 'next/link';

export const columns: ColumnDef<IDeploy>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <VariantBadge>{row.getValue("status")}</VariantBadge>
    ),
  },
  {
    accessorKey: "ref",
    header: "Branch",
  },
  {
    accessorKey: "commit_message",
    header: "Commit message",
  },
  {
    accessorKey: "created_at",
    header: "CreatedAt",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => (
      <Link href={`deploys/${row.getValue("id")}/detail`}>
        <ArrowRightIcon />
      </Link>
    ),
  },
]