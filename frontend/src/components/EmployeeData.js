import React from 'react'

export const EmployeeData = ({employee,deleteEmployee,updateEmployee}) => {
  return (
            <tr>
                <td className='text-left py-4 px-3 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                    {employee.firstName}
                    </div>
                </td>
                <td className='text-left py-4 px-3 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                        {employee.lastName}
                    </div>
                </td>
                <td className='text-left py-4 px-3 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                    {employee.email}
                    </div>
                </td>
                <td className='text-right py-4 px-3 whitespace-nowrap font-medium text-sm'>
                    <a onClick={updateEmployee} className='text-indigo-500 hover:text-indigo-800 px-4 hover:cursor-pointer'>Edit</a>
                    <a onClick={deleteEmployee} className='text-indigo-500 hover:text-indigo-800 hover:cursor-pointer px-4'>Delete</a>
                </td>
            </tr>
  )
}

