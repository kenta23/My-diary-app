import React, {useEffect, useState } from 'react'
import { AlignRight, MinusCircle, PenSquare, X } from 'lucide-react'
import user from '../assets/user.png'
import { auth, database } from '@/Firebase/firebase'
import { ref, onValue, remove } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { useAppDispatch, useAppSelector } from '@/States/hook'
import { clicked, notClicked } from '@/States/Slice'
import Diary from '@/Contents/Diary'



type dataTypes = {  
    UserId: string | null,
    title: string | null,
    diary: string | null,
    date: string | null,
    uid: string | null,
}

//export const ContentValues = createContext<string | null>(null);

const Sidebar = () => {
   const [clickMenu, setClickMenu] = useState<number | null>(null);
   const [contentClicked, setContentClicked] = useState<number | null>(null);
   const [data, setData] = useState([]);
   const [deleted, setDeleted] = useState(false);
  
   const clickedDiary = useAppSelector((state) => state.diary.value);
   const dispatch = useAppDispatch();
   
   const authId = auth.currentUser?.uid;
   const navigate = useNavigate();
   const uuid = uid();

   useEffect(() => {

    const readDiary = () => {
      const diaryRef = ref(database, `Diary/`);
  
      // Use the `get` function to retrieve the data once
     onValue(diaryRef, (snapshot) => {
        const dataVal = snapshot.val()
        setData([]);
        if(dataVal !== null) { 
          Object.values(dataVal).map(datas => {
            setData(prevVal => [...prevVal,datas]);
          })

          console.log(dataVal); 
        }
      })
     }
     readDiary();
    }, [])

    function handleClickMenu(e: React.MouseEvent, id: number) {
       e.stopPropagation()
       // Toggle the clicked item's menu visibility
       setClickMenu((prevId) => (prevId === id ? null : id));
    }

    function ContentView (id: number) {
      setContentClicked((prev) => (prev === id ? null : id));  // if clicked the same object then the value is still null 
      console.log("Content is "+contentClicked) 

      if(contentClicked !== null) {
        dispatch(clicked());
        console.log("clicked menu " + clickedDiary);
      }
      else {
        dispatch(notClicked())
      }
    }
    console.log("Content is "+contentClicked) 

    

    //REMOVE ITEMS 
 const removeDiary = async(userId: string | null) => {
    const itemRef = ref(database, `Diary/${userId}`) // Replace with your data path
    try
    {
      await remove(itemRef);
      setDeleted(true);  
     
    }
    catch (err) {
      console.log(err);
    }
  }

  function handleEdit() {
    
  }

  return (
  <>
    <div className='bg-primary sidebar min-w-[190px] lg:w-[335px] xl:w-[360px] h-[2000px] hidden md:block relative top-0'>
      <div className='flex flex-col gap-4 justify-between items-end '>  
        <div className='mt-[33px] float-right mr-[23px] h-auto w-auto'>
              <img src={user} alt="" className='w-[48px] cursor-pointer'/>
        </div>

        <div className='w-full '>
              <div className='mt-[50px] gap-6 flex flex-col justify-center items-center'>
                  <h1 className='text-center text-white font-inika sm:text-[25px] lg:text-[30px]'>{auth.currentUser?.email} Diary</h1>

                  {/**READ ALL THE DIARIES HERE*/}
              <div className='min-w-auto flex flex-col gap-[25px] items-start'> 
                {data.map((item: dataTypes, id: number) => (
                  //if different user then it will not render
                   <div key={id} onClick={() => ContentView(id)} className={`font-kaisei h-[73px] sm:px-[12px] lg:px-[19px] py-[11px] bg-[#F4E1C3] hover:scale-105 transition-transform ease-in-out duration-150 cursor-pointer shadow-[#07B42] rounded-[25px] shadow-lg justify-start text-center items-center ${clickMenu ? 'sm:gap-[50px] lg:gap-[90px]' : 'sm:gap-[50px] lg:gap-[90px]'} flex`}>
                     <div className="flex-col justify-center items-start gap-[5px] flex">
                         <div className="text-center text-yellow-900 text-[14px] sm:text-[16px] lg:text-lg font-normal">{item.title}</div>
                         <div className="text-center text-stone-500 text-sm sm:text-[12px] lg:text-[md] font-normal">{item.date}</div>
                      </div>

                     {/**EDIT AND DELETE BUTTONS */}
                      <AlignRight onClick={(e) => handleClickMenu(e,id)} color='#DC612C' className={`${!deleted && clickMenu? 'hidden' : 'block'} cursor-pointer`} size={30}/>
                     {clickMenu === id && 
                       <div className='flex gap-2 items-center' onClick={(e) => e.stopPropagation()}>
                         <MinusCircle color='#DA2727'size={24} className='cursor-pointer' onClick={() => removeDiary(item.uid)}/>
                         <PenSquare color='#1390AB' size={24} className='cursor-pointer'/>
                         <X color='#DC612C'size={24} className='cursor-pointer' onClick={() => setClickMenu((prevId) => (prevId === id ? null : id))}/>
                      </div>}               
                   </div>      
                ))}
                  
              </div>
          </div>
          
          <h1>{clickedDiary}</h1>
        </div>
    </div> 
    
  </div> 
 </>
 
)
}

export default Sidebar