import React from 'react'
import TextField from '@mui/material/TextField'

const Verification = () => {
  return (
    <div className='w-full bg-bg h-screen min-h-fit flex place-items-center font-kaisei'>
         <div className=''> 
              <h1>Reset your password</h1>
              <TextField 
                   required
                   label="Email"
                   size='small'
                   variant='outlined'
                   color='warning'
                   className='p-[10px]'
                   name='email'
                   value=''
              />
         </div>
    </div>
  )
}

export default Verification