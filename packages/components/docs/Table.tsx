import React from 'react'
import { Table, TableClasses } from '../src/components/Table'

const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    firstName: 'Name',
    lastName: 'Last Name',
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single'
  }
}

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      }
    })
  }

  return makeDataLevel()
}

export default function ButtonDocs() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName'
          },
          {
            Header: 'Last Name',
            accessor: 'lastName'
          }
        ]
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age'
          },
          {
            Header: 'Visits',
            accessor: 'visits'
          },
          {
            Header: 'Status',
            accessor: 'status'
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress'
          }
        ]
      }
    ],
    []
  )

  const data = React.useMemo(() => makeData(10), [])
  return (
    <div className='space-y-4'>
      <Table
        data={data}
        columns={columns}
        card={{ level: 1 }}
        th='text-gray-400'
      ></Table>

      <Table
        data={data}
        columns={columns}
        card={{ button: true, variant: 'gradient', color: 'red' }}
        onRowClick={() => {}}
        th='text-gray-400'
      ></Table>
    </div>
  )
}
