import {useAppDispatch, useAppSelector } from '@/States/hook';
import CreatePost from './CreatePost';
import ViewDiary from './ViewDiary';
import { useEffect, useState } from 'react';
import { clearStatus, updateStatus } from '@/States/statusSlice';

const Diary = () => {
    const clicked = useAppSelector(state => state.diary.value);
    const [visible, setVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const getStatus = useAppSelector((state) => state.getStatus);


    //if status value changed then re render the page
    useEffect(() => {
      if(getStatus.value) {
        dispatch(updateStatus("Successfully deleted"));
        setVisible(true);

        setTimeout(() => {
           dispatch(clearStatus());
           setVisible(false);
        }, 2000)
      }
   }, [dispatch, getStatus.value]);
  
    let content;
    if(clicked) {
        content = (
            <div>
                <ViewDiary />
            </div>
        )
    }
    else {
           content = (
            <div>
              <CreatePost />
            </div>
        )

    }

  return (
    <div className=''>
          {content}
          {visible && <h1 className='duration-150 relative font-inter text-[12px] md:text-[14px] bg-[#353027] w-fit text-white py-2 rounded-[20px] px-3 bottom-12 left-[30%] text-center'>{getStatus.value}</h1>}
    </div>
  )
}

export default Diary