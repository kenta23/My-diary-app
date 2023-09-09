import React from 'react'
import menubar from '../assets/Menu bar.png'
import userIcon from '../assets/user-mobile.png'
import {  InputLabel } from '@mui/material'
import Sidebar from './Sidebar';

const navbar = document.querySelector('.navbar');
const sidebar = document.querySelector('.sidebar');


const sidebarCoords = sidebar?.getBoundingClientRect();

const coords  = {
    width: sidebarCoords?.width,
    height: sidebarCoords?.height,
    x: sidebarCoords?.x
}

//console.log(sidebarCoords);

const Navbar = () => {
  return (
   <div>
    <div className={`navbar bg-secondary md:me-[190px] lg:me-[335px] xl:me-[360px] py-[20px] md:py-[25px] relative`}>
       <div className='flex flex-row items-center justify-between px-[22px] h-auto'>
        <div className='menubar cursor-pointer visible md:invisible'>
              <img src={menubar} alt="" className='w-[21px] h-auto'/>
        </div> 
      
        <div>
             <h1 className='text-center text-logo font-inika md:text-[30px] lg:text-[35px] sm:text-[28px] text-[25px] font-[700]'> MyDiary</h1>
        </div> 

        <div className='profileicon cursor-pointer visible md:invisible'>
           <img src={userIcon} alt="" className='w-[35px] h-auto'/>
        </div>
          
      </div> 
        
    </div>
   
    <div className='absolute top-0  right-0'>
       <Sidebar />
    </div>
    
  </div>
  )
}

export default Navbar