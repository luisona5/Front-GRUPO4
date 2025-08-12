
import { BrowserRouter, Route, Routes } from 'react-router'
//Google
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Home } from './pages/Home'
import Login from './pages/Login'
import { Register } from './pages/Register'
import { Forgot } from './pages/Forgot'
import { Confirm } from './pages/Confirm'
import { NotFound } from './pages/NotFound'
import Dashboard from './layout/Dashboard'
import Profile from './pages/Profile'
import List from './pages/List'
import Create from './pages/Create'
import Update from './pages/Update'

import Chat from './pages/Chat'
import Reset from './pages/Reset'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import storeProfile from './context/storeProfile'
import storeAuth from './context/storeAuth'
import { useEffect } from 'react'
import PrivateRouteWithRole from './routes/PrivateRouteWithRole'




function App() {
  const { profile} = storeProfile()
  const { token } = storeAuth()

  useEffect(() => {
    if(token){
      profile()
    }
  }, [token])


  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            
            <Route element={<PublicRoute />}>
              <Route index element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='forgot/:id' element={<Forgot/>}/>
              <Route path='confirm/:token' element={<Confirm/>}/>
              <Route path='/reset/:token' element={<Reset/>}/>
              <Route path='*' element={<NotFound />} />
            </Route>
    
    
              <Route path='dashboard/*' element={
                <ProtectedRoute>
                  <Routes>
                    <Route element={<Dashboard />}>
                      <Route index element={<Profile />} />
                      <Route path='listar' element={<List />} />
                      <Route path='crear' element={
                        <PrivateRouteWithRole>
                          <Create />
                        </PrivateRouteWithRole>
                      } />
                      <Route path='actualizar/:id' element={
                        <PrivateRouteWithRole>
                          <Update />
                        </PrivateRouteWithRole>
                      } />
                      <Route path='chat' element={<Chat />} />
                    </Route>
                  </Routes>
                </ProtectedRoute>
              } />
    
    
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>

    </>
  )
}

export default App
