import { useAppDispatch, useAppSelector } from '@/States/hook';
import React from 'react'
import CreatePost from './CreatePost';
import ViewDiary from './ViewDiary';

const Diary = () => {
    const clicked = useAppSelector(state => state.diary.value);
    const dispatch = useAppDispatch();

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
    </div>
  )
}

export default Diary