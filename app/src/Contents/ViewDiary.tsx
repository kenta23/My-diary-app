import { PenSquare, Pencil, RotateCcw, Send, Smile } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import  noProfile  from '../assets/user-orange.png'
import { database } from '@/Firebase/firebase'
import { onValue, ref } from 'firebase/database'
import { useAppSelector } from '@/States/hook'
import  { EmojiStyle } from 'emoji-picker-react';
import Picker from 'emoji-picker-react';

type itemMapType ={
    UserId: string, 
    title: string,
    diary: string, 
    date: string, 
    uid: string, 
}

type textInputType = {
    title: string,
    content: string 
} 

const ViewDiary = () => {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);
    const [textInput, setTextInput] = useState<textInputType>({
        title: '',
        content: '',
    })
    const [clickedEmoji, setClickedEmoji] = useState<boolean>(false);

    //get the data from the sidebar clicked item
    const viewDiary = useAppSelector((state) => state.getDiary.value)

    useEffect(() => {

      const RenderData =  () => {
        const diaryRef = ref(database, `Diary/`);

        onValue(diaryRef, (snapshot) => {
           const rawData = snapshot.val();
           setData([]);

           if(rawData !== null) {
             Object.values(rawData).map(items => {
                setData(prev => [...prev, items]);
             })
           }
           console.log(data);
        })

      }
       RenderData()
    }, [])

    const limitTitleChar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const limitTitle = 18;
        if(val.length <= limitTitle) {
          setTextInput(prev => ({
            ...prev,
            title: val,
          }));
        }
      }

    const updateDiary = async () => {

    }

    const handleEmojiClick = (emoji: string) => {
        //add the emoji to the input state
        setTextInput(prev => ({
         ...prev,
         content: prev?.content +emoji,
       }));
        setClickedEmoji(false);
     }
   
    

return (
<div className='mx-[40px] relative font-kaisei border border-[#745E3D]  flex-col items-center justify-center md:mr-[190px] lg:mr-[335px] xl:mr-[360px] w-[250px] sm:w-[400px] md:w-[550px] lg:w-[700px] xl:w-[850px] h-max'>
  {data.map((item: itemMapType, id) => (
   viewDiary === item.uid && <div key={id}>
     <div className=' flex items-center justify-center w-full h-[65px] border-b border-[#745E3D]'>
       {edit ? 
       <div className=''>
        {/**START DOING A MAP DATA HERE */}
        <input 
           type='text' 
           className='uppercase bg-transparent  text-[#292114] text-[17px] md:text-[20px] lg:text-[25px]  indent-2 placeholder-[#8b7d67] border-none outline-none w-auto' 
           placeholder={item.title}
           name='title'
           value={textInput.title}
           onChange={limitTitleChar}
           contentEditable //make conditional here -- contentEditable or disabled
        /> 
        <Pencil  color='#8b7d67' className='text-center absolute right-4 top-0 lg:top-2 w-[17px] md:w-[20px] lg:w-[25px]  '/> {/**display or not */}
     </div> : <h1 defaultValue='Untitled' className='uppercase bg-transparent  text-[#292114] text-[17px] md:text-[20px] lg:text-[25px]  indent-2 placeholder-[#8b7d67]'>{item.title}</h1>}
     </div> 
     <div className='float-right mx-[23px] my-[25px]'>
       <span className='text-[#96866E] text-[18px] font-normal'>{item.date}</span>
    </div>

   <div className='content view mt-[73px] mb-[105px]'>
     <div className='content pt-[30px] relative h-full'>
      <div className='flex justify-around xl:justify-between items-start mx-2 xl:mx-6'>
       <div className='flex flex-row items-start gap-[12px]'>
         <img src={noProfile}  alt="" className='w-[30px] lg:w-[40px] h-auto'/>
        {edit ?
        <>
           <textarea 
             name="post" 
             placeholder=''   
             defaultValue={item.diary}
             value={textInput.content}
             onChange={(e) => setTextInput(prev => ({...prev, content: e.target.value}))}      
             className=' flex-1 bg-[#f0e7d9] placeholder-[#776E57] lg:text-[20px] w-auto sm:w-[200px] indent-3 md:w-[260px] lg:w-[400px] xl:w-[700px] h-[360px] resize-none outline-none p-2'>  
              
           </textarea>
         <RotateCcw className=''size={18} color='#A88248'cursor={'pointer'}/>
        </> : 
        <h1>{item.diary}</h1>    
      }
     </div>
    </div> 

     </div>


 <div className='flex flex-col float-right  items-center gap-1'>
    {edit && <div className='emojiOrsend flex flex-row gap-[20px]'>
      <div className=''>
        <Smile size={30} color='#DE6C2C' className='cursor-pointer' onClick={() => setClickedEmoji(prev => !prev)}/> 
        {clickedEmoji ? <Picker width={260} emojiStyle={EmojiStyle.APPLE}  onEmojiClick={(e) => handleEmojiClick(e.emoji)}/> : null} 
      </div>
       <Send size={30} color='#2F8421' className='cursor-pointer' />
    </div>}


  <div className='flex gap-[28px] items-center justify-center mt-[25px] float-right mx-[25px]'>
     <button className='text-[#DC612C] hover:text-[#e27241] duration-150 transition-all ease-in-out  cursor-pointer text-[25px] font-medium' onClick={() => setEdit(prev => !prev)}>Edit</button>
     <button className='text-[#BD2323] hover:text-[#d34646] duration-150 transition-all ease-in-out cursor-pointer text-[25px] font-medium '>Delete</button>
  </div>
</div>


  </div> 
        
  </div>
))}  

   
</div>
   
  )
}

export default ViewDiary