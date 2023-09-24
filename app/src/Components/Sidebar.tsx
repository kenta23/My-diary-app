import React, {useEffect, useState } from 'react'
import { AlignRight, MinusCircle, PenSquare, X } from 'lucide-react'
import user from '../assets/user.png'
import { auth, database, store, db } from '@/Firebase/firebase'
import { ref, onValue, remove } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { useAppDispatch, useAppSelector } from '@/States/hook'
import { clicked, notClicked } from '@/States/Slice'
import { putDiaryuid } from '@/States/diarySlice'
import { close, open } from '@/States/menuSlice'
import { saveTitleAndContext } from '@/States/savingInput'
import { collection, getDocs } from 'firebase/firestore'
import { ref as storageRef } from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage'
import { addUrl } from '@/States/imageUrl'
import axios from 'axios'

type dataTypes = {  
    UserId: string | null,
    title: string | null,
    diary: string | null,
    date: string | null,
    uid: string | null,
}

type imageUrlType = {
  imageUrl?: string | null,
  uid?: string | null,
}

//export const ContentValues = createContext<string | null>(null);

const Sidebar = () => {
   const [clickMenu, setClickMenu] = useState<number | null>(null);
   const [contentClicked, setContentClicked] = useState<number | null>(null);
   const [data, setData] = useState([]);
   const [deleted, setDeleted] = useState(false);
   const [name, setName] = useState<string | null>('');
   const [collectionImage, setCollectionImage] = useState([]);
   
  
  
 
   
   const authId = auth.currentUser?.uid;
   const navigate = useNavigate();
   const uuid = uid();

   //reducers
   const dispatch = useAppDispatch();

   const menuOpener = useAppSelector(state => state.getMenuOpener);
   const clickedDiary = useAppSelector((state) => state.diary.value);
   const getUidData = useAppSelector((state) => state.getDiary.value);
   const saveContext = useAppSelector(state => state.getInput);
   const imageUrl = useAppSelector((state) => state.getImageUrl);
   


   

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

          //console.log(data); 
        }
      })
     }
     readDiary();
    }, [])

    useEffect(() => {
       const nameReader = async () => {
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
         auth.currentUser?.uid === doc.data().UserId ? setName(doc.data().FirstName+ " "+doc.data().LastName) : null; //read only the name of the user who logs in
        })
       }

       nameReader();

       async function callFunction () {
        //const url = await getPostImgSrc(post.img)
       // setImageUrl(url)
     }
     callFunction();
    }, [])


    //render Image uploaded from firebase Storage
  const getPostImgSrc = async () => {
      axios.get('http://localhost:3000/api/images')
      .then((response) => {
      const jsonData = response.data;
       // Use jsonData in your frontend as needed
       console.log(jsonData);
       //store imageurl objects to the state
       setCollectionImage(jsonData);
       console.log(collectionImage);
     })
      .catch((error) => {
       console.error('Error fetching data:', error);
     });


      //... firebase code here 
      const renderImage:imageUrlType[] = collectionImage.filter((image: imageUrlType) => image.uid === authId); //return only image that has same uid as the current user
      //console.log('rendered ', renderImage);

      if (renderImage.length > 0) {
        console.log('rendered ', renderImage[0].imageUrl);
        const imgRef = storageRef(store, `${renderImage[0].imageUrl}`);
        await getDownloadURL(imgRef);
        dispatch(addUrl(renderImage[0].imageUrl));

      } else {
        console.log('No matching image found for the current user.');
      }
     
  }

    useEffect(() => {
       getPostImgSrc();
    }, [])

    console.log(imageUrl);
   // console.log("My name is " +name)
   // console.log("My uid is " +auth.currentUser?.uid);

    function handleClickMenu(e: React.MouseEvent, id: number) {
       e.stopPropagation();
       // Toggle the clicked item's menu visibility
       setClickMenu((prevId) => (prevId === id ? null : id));
    }

    function ContentView (id: number, uid: string | null, titleP: string | null, diaryP: string | null) {
      setContentClicked((prev) => (prev === id ? null : id));  // if clicked the same object then the value is still null 
     // console.log("Content is "+contentClicked) 

      if(contentClicked) {
        dispatch(clicked());
        dispatch(putDiaryuid(uid)); //for getting the specific uid for viewing diary 
       // console.log("clicked menu " + clickedDiary);
       //console.log(getUidData);
      dispatch(saveTitleAndContext({title: titleP, diary: diaryP}));
       
      }
      
    }
    //console.log("Content is "+contentClicked) 

   // console.log(authId)

    
 
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

  
  //console.log(saveContext)
  return (
  <>
    <div className='bg-primary sidebar z-10  min-w-[210px] lg:w-[335px] xl:w-[360px] h-[2000px] block relative top-0'>
      <div className='flex flex-col gap-4 justify-between items-end '>  
        <div className='mt-[33px] flex items-center justify-around gap-[90px] lg:float-right mr-[23px] h-auto  '>
              <X color='white' size={34} className='cursor-pointer lg:hidden block' onClick={() => dispatch(open())}/>
              <img src={imageUrl.value ? imageUrl.value :  user} alt="" className='w-[48px] cursor-pointer' onClick={() => navigate('/Profile')}/>
        </div>
 
      
        <div className='w-full '>
              <div className='mt-[50px] gap-6 flex flex-col justify-center items-center'>
                  <h1 className='text-center text-white font-inika sm:text-[25px] lg:text-[30px]'>{name} Diary</h1>

                  {/**READ ALL THE DIARIES HERE*/}
              <div className='min-w-auto flex flex-col gap-[25px] items-start'> 
                {data.map((item: dataTypes, id: number) => (
                  //if different user then it will not render
                  authId === item.UserId && <div key={id} onClick={() => ContentView(id,item.uid, item.title, item.diary)} className={`font-kaisei h-[73px] sm:px-[12px] lg:px-[19px] py-[11px] bg-[#F4E1C3] hover:scale-105 transition-transform ease-in-out duration-150 cursor-pointer shadow-[#07B42] rounded-[25px] shadow-lg justify-start text-center items-center ${clickMenu ? 'sm:gap-[50px] lg:gap-[90px]' : 'sm:gap-[50px] lg:gap-[90px]'} flex`}>
                     <div className="flex-col justify-center items-start gap-[5px] flex">
                         <div className="text-center text-yellow-900 text-[14px] sm:text-[16px] lg:text-lg font-normal" >{item.title}</div>
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
        </div>
    </div> 
    
  </div> 
 </>
 
)
}

export default Sidebar