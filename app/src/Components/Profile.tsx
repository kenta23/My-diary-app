import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import profile from '../assets/no-profile.png'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '@/Firebase/firebase'
import { DocumentData, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '@/States/hook'
import { clearStatus, updateStatus } from '@/States/statusSlice'
import { saveAccount } from '@/States/SaveAccountLogin'
import { accountInfoState } from '@/utils/reduxTypes'

type documentType  = {
   Email: string,
   FirstName: string,
   LastName: string,
   Password: string,
   UserId: string,
   ProfileDisplay: string
}
type AccountUserType = {
  firstname: string | null | undefined,
  lastname: string | null | undefined,
  email: string | null | undefined,
  password: string | null | undefined,
  profileDisplay?: string | null | undefined,
}
const Profile = () => {
  const [changePass, setChangePass] = useState<boolean>(false);
  const [userData, setUserData] = useState<DocumentData>([]);
  const [updateAccount, setUpdateAccount] = useState<AccountUserType>({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      profileDisplay: ''
  })
  const [confirmPassword, setConfirmPassword] = useState<string | null | undefined>('');
  const [documentReference, setDocumentReference] = useState<unknown[]>([]);
  const defaultAccountInfo = useAppSelector((state) => state.getAccount);
  const [visible, setVisible] = useState(false);
  const accountInfo: accountInfoState = useAppSelector(state => state.getAccount) ;


  const navigate = useNavigate(); 

  const collectionData = collection(db, 'Users'); 
  const status = useAppSelector(state => state.getStatus);
  const dispatch = useAppDispatch();

  //store the account data in a state
  useEffect(() => {
    const getData = async () => {
     const data = await getDocs(collectionData);
     
     const userdata = data.docs
     .map((doc) => doc.data()).filter(data => data.UserId === auth.currentUser?.uid);

     if (userdata) {
       setUserData(userdata); 
      }
   }
   getData(); 
}, []);


useEffect(() => {
    setUpdateAccount({
       firstname: accountInfo.value.FirstName,
       lastname: accountInfo.value.LastName,
       email: accountInfo.value.Email,
       password: accountInfo.value.Password,
       profileDisplay: accountInfo.value.ProfileDisplay
    })

    setConfirmPassword(accountInfo.value.Password);
}, [])


  async function formSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    const ref = collection(db, 'Users');
    const userQuery = query(ref, where('UserId', '==', auth.currentUser?.uid));
    const querySnapshot = await getDocs(userQuery);
  
    // Initialize an array to store the document references
    const documentReferences: unknown[] = [];
  
    querySnapshot.forEach((doc) => {
      // Push the document reference, not the document data
      documentReferences.push(doc.ref);
  
    });
  
    // Set the document references in state
    setDocumentReference(documentReferences);
    console.log(documentReferences);
  
     updateData(); 
  }
  
  async function updateData() {

  if(updateAccount.firstname === '' || updateAccount.lastname === '' || updateAccount.email === '' || updateAccount.password === '' || confirmPassword === '') {
     console.log('Please complete all the details');
     dispatch(updateStatus('Please complete all the details'));
     setVisible(true);

     setTimeout(() => {
       dispatch(clearStatus());
       setVisible(false);
     }, 1000)
  }

 else if(updateAccount.password !== confirmPassword) {
   dispatch(updateStatus('Please Confirm your password correctly'));
     setVisible(true);

     setTimeout(() => {
       dispatch(clearStatus());
       setVisible(false);
     }, 1000)
 }
 else {
  try {
    for (const docRef of documentReference) {
      // Use the document reference to update the document
      await updateDoc(docRef, {
        FirstName: updateAccount.firstname,
        LastName: updateAccount.lastname,
        Email: updateAccount.email,
        Password: updateAccount.password,
        //add image to update 
      });
    }
    console.log('Successfully updated');
  } catch(err) {
    console.log(err);
  }
 }
    
}

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      setUpdateAccount(prev => ({
        ...prev, 
        [name]: value
      }))
  }

 console.log('account', updateAccount) 
 //console.log(defaultAccountInfo)
 console.log('password', updateAccount.password);
 console.log('confirm passsword', confirmPassword);

return (
  <div className='w-full h-full relative'>
    <form onSubmit={formSubmit} className='font-kaisei w-full h-auto mb-5'>
        <ArrowLeft color='#EA9619' className='w-[26px] md:w-[30px] lg:w-[35px] h-auto object-cover mt-[30px] ml-[21px] cursor-pointer' onClick={() => navigate('/')}/>

 
         <h1 className='mt-[25px] ml-[21px] text-[20px] md:text-[25px] lg:text-[30px] font-bold'>Personal Information</h1>

      {userData.map((data: documentType) => (
         <div className='flex flex-col items-center gap-[50px]' key={data.UserId}>
         <div className='profile gap-[27px] flex flex-col items-center mt-[112px] '>
             <img src={data.ProfileDisplay? data.ProfileDisplay : profile} alt="" className='cursor-pointer w-[116px] lg:w-[135px] h-auto'/>
             <h1 className='text-[18px] md:text-[25px] lg:text-[30px] uppercase font-medium leading-[24px]'>Profile</h1>
         </div>

   
       <div className='flex flex-col gap-[30px]'>
         <TextField
            label="First Name"
            defaultValue={data.FirstName}
            color='success'
            className='md:w-[240px] lg:w-[260px]'
            name='firstname'
            onChange={handleChange}
           />

           <TextField
            label="Last Name"
            defaultValue={data.LastName}
            color='success'
            className='md:w-[240px] lg:w-[260px]'
            name='lastname'
            onChange={handleChange}
           />
           
           <TextField
            label="Email" 
            defaultValue={data.Email}
            color='success'
            name='email'
            className='md:w-[240px] lg:w-[260px]'
            onChange={handleChange}
           />

           <div className={`flex flex-col gap-2 ${changePass ? 'hidden' : 'block'}`}>
                 <h1 className='text-[#757063] text-[15px] leading-[16px] font-semibold'>Password</h1>
                 <p className='text-[#E08213] inline-block text-[17px] font-normal leading-[16px] underline cursor-pointer' onClick={() => setChangePass(true)}>Change Password</p>
           </div>

           <div className={`password ${changePass ? 'flex' : 'hidden'} relative pb-12 flex-col  gap-[22px]`}>
              <TextField
                 label="Password"
                 defaultValue={data.Password}
                 color='success'
                 type='password'
                 className='md:w-[240px] lg:w-[260px]'
                 name='password'
                 onChange={handleChange}
               />
                <TextField
                 label="Confirm Password"
                 defaultValue={data.Password}
                 color='success'
                 type='password'
                 name='confirmPassword'
                 className='md:w-[240px] lg:w-[260px]'
                 onChange={(e) => setConfirmPassword(e.target.value)}
               />

               <span className='absolute left-0 mx-auto text-[17px] bottom-0 font-medium text-[#BD2323] cursor-pointer' onClick={() => setChangePass(false)}>Cancel</span>
           </div>     
      </div>
   
    
     

         <div className='mt-[40px]'>
              <button className='text-stone-600 text-lg font-normal w-[189px] lg:w-[220px] mx-auto h-[42px] lg:h-[50px] rounded-[50px] hover:bg-primary hover:text-white transition-all duration-150 ease-in-out border border-yellow-900 leading-none'>Delete Account</button>
        </div>
     </div>
      ))}  
      

       <div className='flex justify-between mx-8 mt-8'>
           <button className='w-[127px] h-[39px] pl-[9px] pr-2 pt-2 pb-[7px] bg-amber-500 rounded-[20px] justify-center items-center inline-flex text-white text-base font-medium leading-normal' type='submit' onSubmit={formSubmit}>Save Changes</button>
           <button className='w-[98px] h-[39px] pl-[22px] pr-[23px] pt-2 pb-[7px] bg-red-600 rounded-[20px] justify-center items-center inline-flex text-white text-base font-medium leading-normal'>Cancel</button>
       </div>
    </form>
   {visible && status && <h1 className={` transition-all duration-150 font-inter absolute  text-[14px] left-[20%] sm:left-[25%] md:left-[30%] lg:left-[40%] xl:left-[45%] bottom-3 bg-[#17140F] w-fit text-white py-2 rounded-[20px] px-3`}>{status.value}</h1>}
  </div>
  )
}

export default Profile