import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from "./States/store"
import { Provider } from 'react-redux'
import Login from './Starting page/Login.tsx'
import Register from './Starting page/Register.tsx'
import { BrowserRouter,Route, Routes  } from 'react-router-dom'
import SucessfulRegistered from './Starting page/SucessfulRegistered.tsx'
import PrivateRoutes from './PrivateRoute/PrivateRoutes.tsx'
import Profile from './Components/Profile.tsx'
import CreatePost from './Contents/CreatePost.tsx'
import Verification from './Components/verification.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
       <BrowserRouter >
          <Routes >
               <Route element={<PrivateRoutes />}> {/*it only be accessed when the user account existed */}
                  <Route path='/' element={<App />}/>
                  <Route path="/sucessful" element={<SucessfulRegistered/>} />
                  <Route path='/createnewpost' element={<CreatePost />} />
                  <Route path='/Profile' element={<Profile />} />
               </Route>
  
                <Route path='/register' element={<Register />}/>
                <Route path='/reset' element={<Verification />} />
                <Route path='/login' element={<Login />}/>
              
            </Routes>
       </BrowserRouter>
    </Provider> 
  </React.StrictMode>,
)
