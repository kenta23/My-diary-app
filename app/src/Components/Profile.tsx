import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import profile from '../assets/no-profile.png'
import TextField from '@mui/material/TextField'


const Profile = () => {
  const [changePass, setChangePass] = useState<boolean>(false);



  return (
    <div className='font-kaisei w-full h-auto mb-5 '>
        <ArrowLeft color='#EA9619' className='w-[26px] md:w-[30px] lg:w-[35px] h-auto object-cover mt-[30px] ml-[21px]'/>

         <h1 className='mt-[25px] ml-[21px] text-[20px] md:text-[25px] lg:text-[30px] font-bold'>Personal Information</h1>
        <div className='flex flex-col items-center gap-[50px]'>
            <div className='profile gap-[27px] flex flex-col items-center mt-[112px] '>
                <img src={profile} alt="" className='cursor-pointer w-[116px] lg:w-[135px] h-auto'/>
                <h1 className='text-[18px] md:text-[25px] lg:text-[30px] uppercase font-medium leading-[24px]'>Profile</h1>
            </div>

            <div className='flex flex-col gap-[30px] '>
               <TextField
                  required
                  id="outlined-required"
                  label="First Name"
                  defaultValue=""
                  color='success'
                  className='md:w-[240px] lg:w-[260px]'
                 />

                 <TextField
                  required
                  id="outlined-required"
                  label="Last Name"
                  defaultValue=""
                  color='success'
                  className='md:w-[240px] lg:w-[260px]'
                 />
                 
                 <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  defaultValue=""
                  color='success'
                  className='md:w-[240px] lg:w-[260px]'
                 />

                 <div className={`flex flex-col gap-2 ${changePass ? 'hidden' : 'block'}`}>
                       <h1 className='text-[#757063] text-[15px] leading-[16px] font-semibold'>Password</h1>
                       <p className='text-[#E08213] inline-block text-[17px] font-normal leading-[16px] underline cursor-pointer' onClick={() => setChangePass(true)}>Change Password</p>
                 </div>

                 <div className={`password ${changePass ? 'flex' : 'hidden'} relative pb-12 flex-col  gap-[22px]`}>
                    <TextField
                       required
                       id="outlined-required"
                       label="Password"
                       defaultValue=""
                       color='success'
                       type='password'
                       className='md:w-[240px] lg:w-[260px]'
                     />
                      <TextField
                       required
                       id="outlined-required"
                       label="Confirm Password"
                       defaultValue=""
                       color='success'
                       type='password'
                       className='md:w-[240px] lg:w-[260px]'
                     />

                     <span className='absolute right-0 text-[17px] bottom-0 font-medium text-[#BD2323] cursor-pointer' onClick={() => setChangePass(false)}>Cancel</span>
                 </div>     
            </div>

            <div className='mt-[40px]'>
                 <button className='text-stone-600 text-lg font-normal w-[189px] lg:w-[220px] mx-auto h-[42px] lg:h-[50px] rounded-[50px] hover:bg-primary hover:text-white transition-all duration-150 ease-in-out border border-yellow-900 leading-none'>Delete Account</button>
           </div>
        </div>

       <div className='flex justify-between mx-8 mt-8'>
           <button className='w-[127px] h-[39px] pl-[9px] pr-2 pt-2 pb-[7px] bg-amber-500 rounded-[20px] justify-center items-center inline-flex text-white text-base font-medium leading-normal'>Save Changes</button>
           <button className='w-[98px] h-[39px] pl-[22px] pr-[23px] pt-2 pb-[7px] bg-red-600 rounded-[20px] justify-center items-center inline-flex text-white text-base font-medium leading-normal'>Cancel</button>
       </div>
    </div>
  )
}

export default Profile