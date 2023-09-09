import { TextField } from '@mui/material'
import React, { SetStateAction } from 'react'

const InputTextField = ({ userData, setUserData }: userDataType) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const {name, value} = e.target

     setUserData((prev) => ( {
      ...prev,
        [name]: value
     }))
   }

  
  return (
    <>
         <TextField 
            size='small' 
            id='outlined-required' 
            variant='outlined' 
            label='First name' 
            color='success'
            required
            name='firstname'
            value={userData.firstname}
            onChange={handleChange}
        />
         <TextField 
            size='small' 
            id='outlined-required' 
            variant='outlined' 
            label='Last name' 
            color='success'
            required
            name='lastname'
            value={userData.lastname}
            onChange={handleChange}
         />

          <TextField 
            size='small' 
            id='outlined-required' 
            variant='outlined' 
            label='Email' 
            color='success'
            required
            name='email'
            value={userData.email}
            onChange={handleChange}
        />

        <TextField
            size='small' 
            id='outlined-required' 
            variant='outlined' 
            label='Password' 
            color='success'
            required
            name='password'
            value={userData.password}
            onChange={handleChange}
        />
         <TextField 
            size='small' 
            id='outlined-required' 
            variant='outlined' 
            label='Confirm Password' 
            color='success'
            required       
            name = 'confirmPassword' 
            value={userData.confirmPassword}
            onChange={handleChange}   
        />      
    </>
  )
}

export default InputTextField