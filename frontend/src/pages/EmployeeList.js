import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmployeeData } from '../components/EmployeeData';

export const EmployeeList = () => {
   const navigate=useNavigate();
   const [employees,setEmployees]=useState([])
   const [loading,setLoading] = useState(true)

   useEffect(()=>{

    const fetchEmployee=async()=>{
        try {
            setLoading(true);
            const result=await fetch('http://localhost:8080/api/v1/employee')
            const data=await result.json()
            setEmployees(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
     
    }
    fetchEmployee()
   },[])


   const deleteEmployee=async(id) => {
    try {
        const response=await fetch(`http://localhost:8080/api/v1/employee/${id}`,{method: 'DELETE'})
        const result=await response.json()
        if(result.deleted){
            setEmployees(prevElement=>prevElement.filter(employee => employee.id !== id))
        }
    } catch (error) {
        console.log(error)   
    }
   }

   const updateEmployee=async(id)=>{
    try {
        const response=await fetch(`http://localhost:8080/api/v1/employee/${id}`)
        const employeeData=await response.json()
        navigate(`/updateEmployee/${id}`,{state:employeeData})
        console.log(employeeData)
    } catch (error) {
        console.log(error)
    }
   }

  return (
    <div className="container mx-auto my-8">
        <div className="h-12">
            <button
                onClick={()=>navigate("/addEmployee")} 
                className="rounded text-white font-semibold bg-slate-600 py-2 px-6">
                Add Employee
            </button>
        </div>
        <div className="flex shadow border-b">
            <table className='min-w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-4">First Name</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-4'>Last Name</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-4'>Email Id</th>
                        <th className='text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-4'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                        {!loading && employees.map(employee => (
                            <EmployeeData employee={employee} key={employee.id} deleteEmployee={()=>deleteEmployee(employee.id)} updateEmployee={()=>updateEmployee(employee.id)} />
                        ))}
                        
                        
                </tbody>
            </table>
        </div>
    </div>
  )
}

