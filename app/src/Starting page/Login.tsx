import React, { useState, useEffect } from 'react'
import bg from '../assets/undraw_login.png'
import book from '../assets/Book.png'
import TextField from '@mui/material/TextField'
import { NavLink } from 'react-router-dom'
import { auth } from '@/Firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

type userCredsType = {
    email: string,
    password: string
}


const Login = () => {
    const [userCreds, setUserCreds] = useState<userCredsType>({
        email: '',
        password: '',
    })
    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(false);
    const [status, setStatus] = useState('');

    //check if user is already logged in then the page will redirect to the main page 
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/')
            }
        })
        auth.currentUser?.uid && navigate('/')
    }, [navigate, userCreds.email]); 
 
    const SignIn = async(e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        const { email, password } = userCreds //destructuring states
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Sign in successfully');

       
        setVisible(true);
        setStatus('Login Successful');

        setTimeout(() => {
            setVisible(false);
            navigate('/');
        }, 1000);

      } catch (error) {
        setVisible(true);
        setStatus('Something went wrong');

        setTimeout(() => {
            setVisible(false);
        }, 1000);

        console.log(error);
      }        
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const { name, value } = e.target
         setUserCreds(prev => ({
            ...prev,
            [name]: value
         }))
    }

    console.log(userCreds);
    console.log(auth.currentUser?.uid);

  return (
    <div className='bg-bg h-screen w-full min-h-screen max-w-full min-w-min'>
        <div className='flex flex-col lg:flex-row justify-between h-full w-full'>
            <div className='left lg:w-[40%] ' style={{background: 'linear-gradient(50deg, #C17351 8.04%, rgba(228, 179, 144, 0.53) 52.94%, rgba(245, 196, 181, 0.00) 103.83%)'}}>
               <div className='h-full w-full justify-center items-center flex'>
                  <img src={bg} alt="" className='w-[300px] sm:w-[450px] lg:w-[535px] object-cover h-auto '/>
               </div>
            </div>

            <div className='right mt-[50px] lg:mt-0 lg:w-[60%] h-full'>
                <div className='flex flex-col h-full justify-center items-center'>
                    <div className='flex flex-col justify-center items-center relative'>
                        <h1 className='font-kaisei text-[25px] sm:text-[28px] md:text-[30px] lg:text-[35px] z-10'>Welcome to <span className='text-logo font-inika font-semibold'>MyDiariz</span></h1>
                        <span className='text-gray font-kaisei md:text-[20px]'>A simple diary app</span>

                        <img src={book} alt="" className='w-[240px] absolute bottom-[5px] left-[-80px] md:left-[-110px]'/>
                    </div>


                    <form className='flex flex-col items-center justify-center gap-[32px] my-[28px]' onSubmit={SignIn}>
                        <TextField
                           required
                           label="Email"
                           size='small'
                           variant='outlined'
                           color='warning'
                           className='p-[10px]'
                           name='email'
                           value={userCreds.email}
                           onChange={handleChange}
                        />

                      <TextField
                           required
                           label="Password"
                           size='small'
                           variant='outlined'
                           color='warning'
                           className='p-[10px]'
                           name= 'password'
                           value={userCreds.password}
                           onChange={handleChange}
                           type='password'
                        />

                        <button className='font-kaisei  leading-tight font-medium bg-orange-400 text-white md:w-[201px] text-center md:px-[69px] px-[55px] py-[10px] md:py-[18px] rounded-[20px]' type='submit'>Log in</button>
                    </form>

                    <h1 className='md:text-[22px] mb-[50px] font-kaisei'>Don't have an account? <NavLink to={'/register'} className='text-[#E57E1E] font-semibold cursor-pointer'>Sign up</NavLink></h1>
                    <button onClick={() => auth.signOut()}>logout</button>
                    {visible && <h1 className='duration-150 font-inter text-[12px] md:text-[14px] bg-[#353027] w-fit text-white py-2 rounded-[20px] px-3 bottom-5 text-center'>{status}</h1>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login