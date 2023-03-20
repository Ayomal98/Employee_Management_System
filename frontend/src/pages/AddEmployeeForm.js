import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AddEmployeeForm = () => {
  const initialState={firstName:'',lastName:'',email:''}
  const [formData,setFormData]=useState(initialState)
  const navigate=useNavigate();
  
  const submitForm =async(e)=>{
    e.preventDefault()
    try {
        const result=await fetch('http://localhost:8080/api/v1/employee',
                    {method:'POST',
                    headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify(formData),
                })
        const data = result.json()
        console.log(data)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
    setFormData(initialState)

  }

  const resetFormData =(e)=>{
    e.preventDefault();
    setFormData(initialState)
  }

  const handleChange=(e) => {
    const {value,name}=e.target;
    setFormData({...formData,[name]:value})
  }

  return (
    <div className='flex shadow border-b max-w-2xl mx-auto'>
        <form className='px-8 py-8'>
            <div className='font-thin text-2xl tracking-wider'>
                <h1>New Employee</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} className="h-10 w-96 border mt-2 px-2 py-2" onInput={e=>handleChange(e)}/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} className="h-10 w-96 border mt-2 px-2 py-2" onInput={e=>handleChange(e)}/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>Email</label>
                <input type="email" name="email" value={formData.email} className="h-10 w-96 border mt-2 px-2 py-2" onInput={e=>handleChange(e)}/>
            </div>
            <div className='items-center justify-center space-x-4 h-14 w-full my-4'>
                <button onClick={submitForm} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6 mt-2'>Save</button>
                <button onClick={resetFormData} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6 mt-2'>Clear</button>
            </div>
        </form>
    </div>
  )
}

