import { useAppDispatch, useAppSelector } from '@/States/hook';
import React from 'react'

const Diary = () => {
    const clicked = useAppSelector(state => state.diary.value);
    const dispatch = useAppDispatch();

    let content;

    if(clicked) {
        content = (
            <div>
                <h1>Hello content</h1>
            </div>
        )
    }
    else {
        content = (
            <div>
                <h1>Create new</h1>
            </div>
        )
    }

  return (
    <div>
          {content}
    </div>
   
  )
}

export default Diary