import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from "./States/store"
import { Provider } from 'react-redux'
import Login from './Starting page/Login.tsx'
import Register from './Starting page/Register.tsx'
import Welcome from './Starting page/Welcome.tsx'
import { BrowserRouter,Route, Routes  } from 'react-router-dom'
import ErrorPage from './Starting page/ErrorPage.tsx'
import { auth } from './Firebase/firebase.ts'
import SucessfulRegistered from './Starting page/SucessfulRegistered.tsx'
import PrivateRoutes from './PrivateRoute/PrivateRoutes.tsx'
import SecureRoute from './PrivateRoute/SecureRoute.tsx'
import Content from './Components/Content.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
       <BrowserRouter >
          <Routes >
               <Route element={<PrivateRoutes />}> {/*it only renders when the user account existed */}
                  <Route path='/' element={<App />}/>
                  <Route path="/sucessful" element={<SucessfulRegistered/>} />
                  <Route path='/post' element={<Content />}/>
               </Route>
  
                <Route path='/register' element={<Register />}/>
                <Route path='/login' element={<Login />}/>
            </Routes>
       </BrowserRouter>
    </Provider> 
  </React.StrictMode>,
)
