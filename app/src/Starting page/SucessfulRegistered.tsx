import React from 'react'
import {Info } from 'lucide-react'

const SucessfulRegistered = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen bg-bg'>
       <div className='flex items-center gap-2'>
         <Info size={25} color='rgb(150 134 110)'/><span className='text-gray text-[25px]'>Account Registered Succesfully!</span>
       </div>
    </div>
  )
}

export default SucessfulRegistered