import React from 'react'
import { useRouteError} from 'react-router-dom'


const ErrorPage = () => {
 const error: unknown = useRouteError();

 console.log(error);
  return (
    <div className='flex items-center flex-col justify-center'>
         <h1 className='text-bold text-[48px]'>404 Error Page not found </h1>
         <p className='text-[25px] '>{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorPage