import React, { useCallback } from 'react'
import { useTable, UseTableOptions } from 'react-table'
import clsx from 'clsx'
import { Card, CardProps } from './Card'

export interface TableProps<D extends object> extends UseTableOptions<D> {
  className?: string
  card?: CardProps
  thead?: string
  th?: string
  tbody?: string
  tr?: string
  td?: string
  onRowClick?: (data: D) => void | Promise<void>
}

export const TableClasses = {
  _: '',
  // This is here to prevent purging grid classes
  _cols:
    'grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12',
  thead: {
    _: 'space-y-4'
  },
  th: {
    _: 'px-6 py-3 text-left text-xs font-bold uppercase tracking-wider'
  },
  tbody: {
    _: 'space-y-4'
  },
  tr: {
    _: ''
  },
  td: {
    _: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-white'
  }
}

export function Table<D extends object>({
  className,
  card = {},
  thead,
  th,
  tbody,
  tr,
  td,
  onRowClick,
  ...props
}: TableProps<D>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(props)

  const handleRowClick = useCallback(
    (row: D) => () => onRowClick(row),
    [onRowClick]
  )

  return (
    <div {...getTableProps()} className={clsx(className, 'space-y-4')}>
      <div className={clsx(TableClasses.thead._, thead)}>
        {headerGroups.map((headerGroup) => (
          <div
            {...headerGroup.getHeaderGroupProps()}
            className={clsx(
              'md:grid',
              `grid-cols-${headerGroup.headers.length}`
            )}
          >
            {headerGroup.headers.map((column) => (
              <div
                className={clsx(TableClasses.th._, th)}
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        {...getTableBodyProps()}
        className={clsx(TableClasses.tbody._, tbody)}
      >
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Card
              {...card}
              {...(row.getRowProps() as any)}
              {...(onRowClick ? { onClick: handleRowClick(row.original) } : {})}
              className={clsx(
                'md:grid',
                `grid-cols-${row.cells.length}`,
                card.className,
                tr
              )}
            >
              {row.cells.map((cell) => {
                return (
                  <div
                    {...cell.getCellProps()}
                    className={clsx(TableClasses.td._, td)}
                  >
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
