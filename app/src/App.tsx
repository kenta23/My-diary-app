import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import { useAppDispatch, useAppSelector } from "./States/hook"
import CreatePost from "./Contents/CreatePost";
import Diary from "./Contents/Diary";
import ViewDiary from "./Contents/ViewDiary";
import Login from "./Starting page/Login";


function App() {
 
return (
   <div className="w-full relative min-h-full h-full  bg-[#F4F0E9]">
        <div className="">
          <Navbar />
        </div>

      {/* RENDER FOLLOWS*/ }
      <div className="w-full flex  h-screen  items-center justify-center">
         <Diary />
      </div>
    </div>
  )
}

export default App
