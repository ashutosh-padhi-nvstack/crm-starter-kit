'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { VisaApplication } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle, Globe } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';

export const columns: ColumnDef<VisaApplication>[] = [
  {
    accessorKey: 'photo_url',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <Image
            src={row.getValue('photo_url')}
            alt={row.getValue('name')}
            fill
            className='rounded-lg'
          />
        </div>
      );
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<VisaApplication, unknown> }) => (
      <DataTableColumnHeader column={column} title='Application Number' />
    ),
    cell: ({ cell }) => <div className='font-mono text-sm'>{cell.getValue<VisaApplication['name']>()}</div>,
    meta: {
      label: 'Application Number',
      placeholder: 'Search applications...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: ({ column }: { column: Column<VisaApplication, unknown> }) => (
      <DataTableColumnHeader column={column} title='Country' />
    ),
    cell: ({ cell }) => {
      const country = cell.getValue<VisaApplication['category']>();
      const Icon = Globe;

      return (
        <Badge variant='outline' className='capitalize'>
          <Icon className='mr-1 h-3 w-3' />
          {country}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'countries',
      variant: 'multiSelect',
      options: CATEGORY_OPTIONS
    }
  },
  {
    accessorKey: 'price',
    header: 'FEE (AED)',
    cell: ({ cell }) => {
      const price = cell.getValue<number>();
      return <div className='font-medium'>AED {price.toFixed(2)}</div>;
    }
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
    cell: ({ cell }) => {
      const desc = cell.getValue<string>();
      return <div className='text-sm text-muted-foreground max-w-md truncate'>{desc}</div>;
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
