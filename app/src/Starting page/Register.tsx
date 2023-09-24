import React, {useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import TextField from '@mui/material/TextField'
import { FormControl } from '@mui/material'
import { CSSProperties } from 'react'
import noprofile  from '../assets/no-profile.png'
import book from '../assets/booklet.png'
import { auth, db, store} from '@/Firebase/firebase'
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth'
import { error } from 'console'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import axios from 'axios'
import { useAppDispatch } from '@/States/hook'
import { addUrl } from '@/States/imageUrl'

const formStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
  justifyContent: 'flex-end', 
  flexWrap: 'wrap', 
  flexDirection: 'row', 
  alignItems: 'center', 
  gap: '28px 65px'
}

type userDataType = {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  userId?: React.ReactNode,
 
}
/*const user: userDataType = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
}

*/

const Register = () => {
  const [userData, setUserData] = useState<userDataType>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    userId: auth?.currentUser?.uid,
  });

 

  const [status, setStatus] = useState('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [fileUpload, setFileUpload] = useState<Blob | Uint8Array | ArrayBuffer | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    setUserData((prev) => ({
     ...prev,
       [name]: value
    }))
  }


  console.log(auth.currentUser?.uid)

const saveData = async (e: React.FormEvent <HTMLButtonElement>) => {
  e.preventDefault();

  if(userData.firstname === '' || userData.lastname === '' || userData.email === '' || userData.password === '') { 
       setStatus("Please complete your details ");
       setVisible(true);
       return;
  }
  else if(confirmPassword !== userData.password) {
    setStatus('Password dont match');
    setVisible(true);
    return;
  }
  else if((userData.password).length < 8 ) {
    setStatus("Password is too short");
    setVisible(true);
    return;
  }
  else if(fileUpload === null) {
      setStatus("Please upload a Display Profile");
      setVisible(true);
      return;
  }
  else {
    //if successful registered, proceed to create new account from firebase
    const alreadyUser = await fetchSignInMethodsForEmail(auth, userData.email);

    if (alreadyUser && alreadyUser.length > 0) {
        setStatus('Account already exists');
        setVisible(true);
        return;
    }
    else {
      setIsRegistered(true);
      createAccount();
      setStatus("Account created");
      setVisible(false);

      navigate('/sucessful');
  
      setTimeout(() => {
        navigate('/login') 
      }, 2000) 
      
    }
  }
};

function logout() { //LOGOUT BUTTON
  auth.signOut();
  dispatch(addUrl(''));
}

 //ADD IMAGE URL TO JSON FILE 
 //POST DATA
 const uploadImage = async () => {
  try {
    // Upload the profile picture to Firebase Storage
    const storageRef = ref(store, `Users/${auth.currentUser?.uid}/${fileUpload?.name}`);
    await uploadBytes(storageRef, fileUpload); // Assuming fileUpload is a Blob or File object

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    //add the download url to the imageUrl state reducer
    dispatch(addUrl(downloadURL));

    const userDataToSend = {
      imageUrl: downloadURL, // Include the image URL
      uid: auth.currentUser?.uid,
    };

    // Send this data to the server using a separate API request
    await axios.post('http://localhost:3000/api/images', userDataToSend);
    console.log('image sent to server ');
   
  } catch (err) {
    
    console.error('Image upload or data sending failed:', err);
  }
};


const createAccount = async () => {
   try {
      await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      console.log("Account created", userData.email, userData.password);

        // Upload the profile picture to Firebase Storage
        const storageRef = ref(store, `Users/${auth.currentUser?.uid}/${fileUpload?.name}`);
       await uploadBytes(storageRef, fileUpload); // Assuming fileUpload is a Blob or File object
     // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
     

      /*ADD DATA TO THE FIRESTORE */
      const collectiondata =  collection(db, "Users");

      await addDoc(collectiondata, {
        FirstName: userData.firstname,
        LastName: userData.lastname,
        Email: userData.email,
        Password: userData.password,
        UserId: auth.currentUser?.uid.toString(),
        ProfileDisplay: downloadURL,
      })
  
      
      //ADD DATA TO THE JSON FILE
      await uploadImage(); 
    } 

   catch(err) {
     if(err === 'auth/email-already-in-use') {
       setStatus("Account already exists");
       setVisible(true);
       return;
     }
      setStatus("An error occurred during account creation");
      setVisible(true);
       console.log(err);
   }
}

/*const uploadFile = async () => {
  //reference 
  try {
    const pictureRef = ref(store, `Users/${userData.firstname}/${fileUpload}`)
    await uploadBytes(pictureRef, fileUpload);
    console.log("Uploaded file successfully");
  }
  catch(err) {
    console.log(err);
  }
} */


  return (
    <div className='bg-bg w-full h-screen relative font-kaisei'>
       <div className='pt-[25px] ps-[15px] w-min h-min '>
          <ArrowLeft color='#EA9619' size={45} className='cursor-pointer'/>
       </div>

       <h1 className='mt-[30px] md:mt-[43px] ms-[55px] text-dark leading-[20px] text-[25px] sm:text-[28px] md:text-[30px] lg:text-[35px] grid-cols-2'>Account Registration</h1>

       <div className='mt-[20px]'>
           <div className='flex lg:flex-row flex-col lg:flex-nowrap flex-wrap-reverse justify-around gap-8 lg:gap-0 items-center mx-[40px] md:mx-[50px] my-[30px] '>
      
         <FormControl required sx={formStyles}>
          <TextField 
            size='small' 
            id='firstname' 
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
            id='lastname' 
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
            id='email' 
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
            id='password' 
            variant='outlined' 
            label='Password' 
            color='success'
            required
            name='password'
            type='password'
            value={userData.password}
            onChange={handleChange}
            className='relative'
         />
        
         <TextField 
            size='small' 
            id='confirmPassword' 
            variant='outlined' 
            label='Confirm Password' 
            color='success'
            required       
            type='password'
            name = 'confirmPassword' 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}   
        />   
       </FormControl>   
  
                
         <div className='flex flex-col items-center gap-[45px] md:gap-[80px]'>
                 <div className='flex flex-col items-center gap-6'>
                   <img src={noprofile} alt="" className='w-[100px] sm:w-[130px] md:w-[135px] h-auto object-cover cursor-pointer'/>
                     <h1 className='uppercase text-[18px] leading-[24px] font-medium'>Upload Display Photo</h1>
                     <input type="file" className='p-2 bg-primary border-none rounded-[10px] text-dark cursor-pointer' id="fileInput"  accept="image/*" placeholder='Upload Display Photo' onChange={(e) => setFileUpload(e.target.files[0])}/>
                 </div>

                 <button type='submit' className='font-kaisei leading-tight font-medium bg-orange-400 hover:bg-green-400 transition-all duration-150 ease-in-out text-white text-center md:px-[69px] px-[40px] py-[10px] md:py-[18px] rounded-[20px]' onClick={saveData}>Register Account</button>
             </div>
           </div>
       </div>

       <div className='absolute bottom-9 left-5 hidden lg:block'>
         <img src={book} alt="" className='w-[100px] sm:w-[150px] md:w-[200px] h-auto object-cover rotate-[-10deg]'/>
       </div>

       <button className='absolute hidden lg:block rounded-[20px] px-[20px] md:px-[30px] py-[10px] bg-[#EC2525] hover:bg-[#ee4d4d] duration-150 ease-in-out transition-all text-white text-center right-4 bottom-4'>Cancel</button>
       {status && visible && <h1 className={`${visible ? 'opacity-90 bottom-10 ' : 'opacity-0 bottom-0'} transition-all duration-150 font-inter absolute left-[50%] text-[14px]  bg-[#17140F] w-fit text-white py-2 rounded-[20px] px-3`}>{status}</h1>}

       <button onClick={logout}>logout</button>
    </div>

  )
  
}


export default Register